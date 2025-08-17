// Server-only: syncs Clerk user -> Prisma User (idempotent)
import "server-only";
import { features } from "./env";
import { currentUser } from "@clerk/nextjs/server";

export async function syncClerkUserIntoPrisma() {
  if (!features.both) return;

  const prisma = await import("./db").then((mod) => mod.default);

  const u = await currentUser();
  if (!u) return;

  const existing = await prisma.user.findUnique({ where: { id: u.id } });
  if (existing) return;

  await prisma.user.upsert({
    where: { id: u.id },
    create: {
      id: u.id,
      email: u.emailAddresses?.[0]?.emailAddress ?? null,
      name:
        [u.firstName, u.lastName].filter(Boolean).join(" ") ||
        u.username ||
        null,
      imageUrl: u.imageUrl ?? null,
    },
    update: {
      email: u.emailAddresses?.[0]?.emailAddress ?? null,
      name:
        [u.firstName, u.lastName].filter(Boolean).join(" ") ||
        u.username ||
        null,
      imageUrl: u.imageUrl ?? null,
    },
  });
}
