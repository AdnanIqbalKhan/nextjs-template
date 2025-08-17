// Runs on install: only prepares Prisma if DATABASE_URL is present
import { execSync } from "node:child_process";

const hasDb = !!process.env.DATABASE_URL;
if (!hasDb) {
  console.log("⏭️  DATABASE_URL not found: skipping Prisma generate/migrate.");
  process.exit(0);
}

try {
  console.log("🔧 Prisma generate…");
  execSync("npx prisma generate", { stdio: "inherit" });

  // Use db push (safe for templates). Switch to migrate if you prefer migration files.
  console.log("🗃️  Prisma db push…");
  execSync("npx prisma db push", { stdio: "inherit" });

  console.log("✅ Prisma is ready.");
} catch (e) {
  console.error("❌ Prisma setup failed:", e?.message ?? e);
  process.exit(1);
}
