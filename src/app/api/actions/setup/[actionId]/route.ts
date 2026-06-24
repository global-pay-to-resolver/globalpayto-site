import {
  invalidActionResponse,
  isSameOriginActionPost,
  isValidHostedActionId,
} from "@/lib/action-request-security";
import { submitHostedAction } from "@/lib/hosted-actions";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ actionId: string }> },
) {
  const { actionId } = await params;
  if (!isValidHostedActionId(actionId, "setup") || !isSameOriginActionPost(request)) {
    return invalidActionResponse();
  }

  const body = await request.json() as { decision?: "approve" | "deny" };

  const result = await submitHostedAction({
    actionId,
    kind: "setup",
    decision: body.decision === "deny" ? "deny" : "approve",
  });

  return Response.json(result, {
    headers: {
      "cache-control": "no-store",
    },
  });
}
