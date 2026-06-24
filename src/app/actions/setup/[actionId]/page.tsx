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

  // REVIEW: Gap: the server component hydrates action details directly from `actionId` before any Cubid login/session check or token exchange. Recommendation: before wiring production data, gate this route behind backend action validation and render only generic expired/invalid/loading copy until the correct user is authenticated.

  return <SetupActionClient action={action} />;
}
