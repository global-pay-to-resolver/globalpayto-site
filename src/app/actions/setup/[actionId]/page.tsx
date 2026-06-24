import { SetupActionClient } from "@/components/hosted-action/setup-action-client";
import { getHostedSetupAction } from "@/lib/hosted-actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

interface SetupActionPageProps {
  params: Promise<{
    actionId: string;
  }>;
}

export default async function SetupActionPage({ params }: SetupActionPageProps) {
  const { actionId } = await params;
  const action = await getHostedSetupAction(actionId);

  return <SetupActionClient action={action} submitUrl={`/api/actions/setup/${actionId}`} />;
}
