import { RouteSelectionClient } from "@/components/hosted-action/route-selection-client";
import { getHostedRouteSelectionAction } from "@/lib/hosted-actions";

interface RouteSelectionPageProps {
  params: Promise<{
    actionId: string;
  }>;
}

export default async function RouteSelectionPage({ params }: RouteSelectionPageProps) {
  const { actionId } = await params;
  const action = await getHostedRouteSelectionAction(actionId);

  return <RouteSelectionClient action={action} submitUrl={`/api/actions/route-selection/${actionId}`} />;
}
