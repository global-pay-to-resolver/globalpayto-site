import { ProtectedRouteSelectionPage } from "@/components/hosted-action/protected-route-selection-page";
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

  return <ProtectedRouteSelectionPage actionId={actionId} />;
}
