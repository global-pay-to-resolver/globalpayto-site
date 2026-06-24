import {
  getRouteSelectionAction,
  getSetupAction,
  type HostedActionState,
  type RouteSelectionAction,
  type SetupAction,
} from "@/lib/mock-actions";

type HostedActionKind = "setup" | "route_selection";
type HostedActionDecision = "approve" | "deny" | "select_route" | "leave_unchanged";

interface HostedActionCompletion {
  state: HostedActionState;
  selectedRouteId?: string;
}

const resolverBaseUrl = process.env.GLOBALPAYTO_RESOLVER_BASE_URL;
const devCubidUserId = process.env.GLOBALPAYTO_DEV_CUBID_USER_ID;

export async function getHostedSetupAction(actionId: string): Promise<SetupAction> {
  return await getHostedAction(actionId, "setup", () => getSetupAction(actionId));
}

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
    return {
      state: input.kind === "setup"
        ? input.decision === "approve" ? "approved" : "denied"
        : input.decision === "select_route" ? "selected_route" : "denied",
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
  return url.replace(/\/actions\/(setup|route-selection)\/[^/?#]+/g, "/actions/$1/[redacted]");
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

  if (devCubidUserId) {
    headers["x-globalpayto-dev-cubid-user-id"] = devCubidUserId;
  }

  return headers;
}
