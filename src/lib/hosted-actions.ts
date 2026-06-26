import {
  getRouteSelectionAction,
  type HostedActionState,
  type RouteSelectionAction,
} from "@/lib/mock-actions";

type HostedActionKind = "route_selection";
type HostedActionDecision = "select_route" | "leave_unchanged";

interface HostedActionCompletion {
  state: HostedActionState;
  selectedRouteId?: string;
}

const resolverBaseUrl = process.env.GLOBALPAYTO_RESOLVER_BASE_URL;
const devCubidUserId = process.env.GLOBALPAYTO_DEV_CUBID_USER_ID;

export async function getHostedRouteSelectionAction(actionId: string): Promise<RouteSelectionAction> {
  return await getHostedAction(actionId, "route_selection", () => getRouteSelectionAction(actionId));
}

export async function submitHostedAction(input: {
  actionId: string;
  kind: HostedActionKind;
  decision: HostedActionDecision;
  selectedRouteId?: string;
}): Promise<HostedActionCompletion> {
  if (!resolverBaseUrl) {
    const action = getRouteSelectionAction(input.actionId);
    if (action.state !== "ready") return { state: "restart_required" };
    const options = action.paths.flatMap((path) => path.options);
    if (
      input.decision === "select_route" &&
      !options.some((option) => option.id === input.selectedRouteId)
    ) {
      return { state: "restart_required" };
    }

    return {
      state: input.decision === "select_route" ? "selected_route" : "denied",
      selectedRouteId: input.selectedRouteId,
    };
  }

  const response = await fetch(`${resolverBaseUrl}/functions/v1/route-selection`, {
    method: "POST",
    headers: backendHeaders(),
    body: JSON.stringify(input),
    cache: "no-store",
  });

  if (!response.ok) return { state: "restart_required" };
  return await response.json() as HostedActionCompletion;
}

export function redactActionUrlForLogs(url: string): string {
  return url.replace(/\/actions\/route-selection\/[^/?#]+/g, "/actions/route-selection/[redacted]");
}

async function getHostedAction<T>(
  actionId: string,
  kind: HostedActionKind,
  fallback: () => T,
): Promise<T> {
  if (!resolverBaseUrl) return fallback();

  const url = new URL(`${resolverBaseUrl}/functions/v1/hosted-actions`);
  url.searchParams.set("actionId", actionId);
  url.searchParams.set("kind", kind);

  const response = await fetch(url, {
    headers: backendHeaders(),
    cache: "no-store",
  });

  if (!response.ok) return fallback();
  return await response.json() as T;
}

function backendHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };

  if (devCubidUserId && isLocalOrTestRuntime()) {
    headers["x-globalpayto-dev-cubid-user-id"] = devCubidUserId;
  }

  return headers;
}

function isLocalOrTestRuntime(): boolean {
  return process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
}
