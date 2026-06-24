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

  // Sprint 2 fixture hydration; Sprint 3 fetches options only after backend action exchange.

  return <RouteSelectionClient action={action} />;
}
