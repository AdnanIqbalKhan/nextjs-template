import { features } from "@/lib/env";
import { syncClerkUserIntoPrisma } from "@/lib/sync-user";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  // If Clerk is on, get the user; and if DB + Clerk are on, sync them.
  let user = null as null | {
    id: string;
    email: string | null;
    name: string | null;
  };

  if (features.clerk) {
    const u = await currentUser();
    if (u) {
      user = {
        id: u.id,
        email: u.emailAddresses?.[0]?.emailAddress ?? null,
        name: u.fullName ?? null,
      };
      if (features.both) await syncClerkUserIntoPrisma(); // idempotent
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      {features.clerk ? (
        user ? (
          <p>
            Hello, <b>{user.name ?? "user"}</b>! 🎉 (Synced:{" "}
            {features.both ? "Yes" : "N/A"})
          </p>
        ) : (
          <p>Please sign in to view your dashboard.</p>
        )
      ) : (
        <p>Auth is disabled. This page is public.</p>
      )}
    </section>
  );
}
