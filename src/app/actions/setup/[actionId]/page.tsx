import { SetupActionClient } from "@/components/hosted-action/setup-action-client";
import { getHostedSetupAction } from "@/lib/hosted-actions";

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
