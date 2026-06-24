import { SetupActionClient } from "@/components/hosted-action/setup-action-client";
import { getSetupAction } from "@/lib/mock-actions";

interface SetupActionPageProps {
  params: Promise<{
    actionId: string;
  }>;
}

export default async function SetupActionPage({ params }: SetupActionPageProps) {
  const { actionId } = await params;
  const action = getSetupAction(actionId);

  return <SetupActionClient action={action} />;
}
