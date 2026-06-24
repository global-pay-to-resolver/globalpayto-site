import { submitHostedAction } from "@/lib/hosted-actions";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ actionId: string }> },
) {
  const { actionId } = await params;
  // REVIEW: Before this route relies on Cubid session cookies, validate the action token shape and
  // same-origin POST context here. At the moment any site can attempt a state-changing POST to a
  // guessed action URL and the backend is left to absorb all CSRF/token-shape mistakes.
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
