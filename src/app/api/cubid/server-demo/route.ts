import { NextResponse } from "next/server";

import { createServerCubidClient } from "@/lib/cubid/server";

type ServerDemoOperation =
  | "ensure-user"
  | "identity"
  | "score"
  | "stamps"
  | "recovery-status"
  | "start-recovery-release";

type ServerDemoRequest = {
  email?: string;
  operation?: ServerDemoOperation;
  providerKey?: string;
  recoveryBundleId?: string;
  userId?: string;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
    };
  }

  return {
    message: "Cubid request failed.",
    name: "UnknownError",
  };
}

function requireValue(value: string, label: string) {
  if (!value) {
    return NextResponse.json(
      {
        ok: false,
        error: `${label} is required for this server demo operation.`,
      },
      { status: 400 }
    );
  }

  return null;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ServerDemoRequest;
  const operation = body.operation ?? "ensure-user";
  const cubid = createServerCubidClient();

  if (!cubid.configured) {
    return NextResponse.json(
      {
        ok: false,
        mode: "not_configured",
        missing: cubid.missing,
        message:
          "Server-only Cubid credentials are missing. Add them to .env.local to run live API calls.",
      },
      { status: 503 }
    );
  }

  try {
    if (operation === "ensure-user") {
      const email = asTrimmedString(body.email);
      const missing = requireValue(email, "Email");

      if (missing) {
        return missing;
      }

      const user = await cubid.client.ensureUserByEmail({ email });

      return NextResponse.json({
        ok: true,
        operation,
        result: {
          email: user.email,
          isNewAppUser: user.isNewAppUser,
          userId: user.userId,
        },
      });
    }

    const userId = asTrimmedString(body.userId);
    const missingUserId = requireValue(userId, "Cubid user id");

    if (missingUserId) {
      return missingUserId;
    }

    if (operation === "identity") {
      const identity = await cubid.client.fetchIdentity({ userId });

      return NextResponse.json({
        ok: true,
        operation,
        result: {
          stampDetails: identity.stampDetails.map((stamp) => ({
            stampType: stamp.stampType,
            status: stamp.status,
            value: stamp.value,
          })),
        },
      });
    }

    if (operation === "score") {
      const score = await cubid.client.fetchScore({ userId });

      return NextResponse.json({
        ok: true,
        operation,
        result: {
          cubidScore: score.cubidScore,
          scoringSchema: score.scoringSchema,
        },
      });
    }

    if (operation === "stamps") {
      const stamps = await cubid.client.fetchStamps({ userId });

      return NextResponse.json({
        ok: true,
        operation,
        result: {
          email: stamps.email ?? null,
          stamps: stamps.allStamps.map((stamp) => ({
            isValid: stamp.isValid,
            stampType: stamp.stampType,
            stampTypeId: stamp.stampTypeId,
            value: stamp.uniqueValue ?? stamp.identity ?? null,
          })),
        },
      });
    }

    if (operation === "recovery-status") {
      const bundle = await cubid.client.getRecoveryBundleStatus({
        providerKey: asTrimmedString(body.providerKey) || undefined,
        recoveryBundleId: asTrimmedString(body.recoveryBundleId) || undefined,
        userId,
      });

      return NextResponse.json({
        ok: true,
        operation,
        result: {
          bundleVersion: bundle.bundle.bundleVersion,
          createdAt: bundle.bundle.createdAt,
          expiresAt: bundle.bundle.expiresAt,
          lastReleasedAt: bundle.bundle.lastReleasedAt,
          providerKey: bundle.bundle.providerKey,
          recoveryBundleId: bundle.bundle.recoveryBundleId,
          recoveryReference: bundle.bundle.recoveryReference,
          status: bundle.bundle.status,
          updatedAt: bundle.bundle.updatedAt,
        },
      });
    }

    if (operation === "start-recovery-release") {
      const release = await cubid.client.startRecoveryBundleRelease({
        providerKey: asTrimmedString(body.providerKey) || undefined,
        recoveryBundleId: asTrimmedString(body.recoveryBundleId) || undefined,
        userId,
      });

      return NextResponse.json({
        ok: true,
        operation,
        result: {
          expiresAt: release.releaseSession.expiresAt,
          recoveryBundleId: release.releaseSession.recoveryBundleId,
          recoverySessionId: release.releaseSession.recoverySessionId,
          recoveryUrl: release.releaseSession.recoveryUrl,
          status: release.releaseSession.status,
        },
      });
    }

    return NextResponse.json(
      { ok: false, error: "Unsupported Cubid server demo operation." },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: normalizeError(error),
      },
      { status: 502 }
    );
  }
}
