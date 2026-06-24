import { RouteSelectionClient } from "@/components/hosted-action/route-selection-client";
import { getRouteSelectionAction } from "@/lib/mock-actions";

interface RouteSelectionPageProps {
  params: Promise<{
    actionId: string;
  }>;
}

export default async function RouteSelectionPage({ params }: RouteSelectionPageProps) {
  const { actionId } = await params;
  const action = getRouteSelectionAction(actionId);

  return <RouteSelectionClient action={action} />;
}
