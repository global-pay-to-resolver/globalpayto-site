import { RouteSelectionClient } from "@/components/hosted-action/route-selection-client";
import { getHostedRouteSelectionAction } from "@/lib/hosted-actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

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
