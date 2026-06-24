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

  // REVIEW: Gap: route-selection options and current default are hydrated solely from `actionId`, so a guessed valid action URL can reveal eligible PayToDapps in the mock pattern. Recommendation: production hydration should exchange the opaque action id with the backend after Cubid-authenticated user validation, then fetch options for that user/action only.

  return <RouteSelectionClient action={action} />;
}
