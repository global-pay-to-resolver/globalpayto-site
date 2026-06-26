import {
  invalidActionResponse,
  isSameOriginActionPost,
  isValidHostedActionId,
} from "@/lib/action-request-security";
import { getHostedRouteSelectionAction, submitHostedAction } from "@/lib/hosted-actions";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ actionId: string }> },
) {
  const { actionId } = await params;
  if (!isValidHostedActionId(actionId)) {
    return invalidActionResponse();
  }

  const result = await getHostedRouteSelectionAction(actionId);

  return Response.json(result, {
    headers: {
      "cache-control": "no-store",
    },
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ actionId: string }> },
) {
  const { actionId } = await params;
  if (!isValidHostedActionId(actionId) || !isSameOriginActionPost(request)) {
    return invalidActionResponse();
  }

  const body = await request.json() as {
    decision?: "select_route" | "leave_unchanged";
    selectedRouteId?: string;
  };

  const result = await submitHostedAction({
    actionId,
    kind: "route_selection",
    decision: body.decision === "leave_unchanged" ? "leave_unchanged" : "select_route",
    selectedRouteId: body.selectedRouteId,
  });

  return Response.json(result, {
    headers: {
      "cache-control": "no-store",
    },
  });
}
