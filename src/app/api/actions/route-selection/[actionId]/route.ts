import { submitHostedAction } from "@/lib/hosted-actions";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ actionId: string }> },
) {
  const { actionId } = await params;
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
