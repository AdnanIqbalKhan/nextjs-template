# 🚀 Next.js Flexible Starter (DB + Clerk Optional)
Kickstart your next big idea with this modern **Next.js starter template** — everything you need to launch a production-ready app, right out of the box. With the App Router, TypeScript, Tailwind CSS, shadcn/ui, Clerk authentication, and Prisma ORM already integrated, you’ll save days of setup and jump straight into building. Whether you’re launching a SaaS product, a sleek dashboard, or a full-stack app, this template is built to scale and designed for flexibility.

-   ✅ Works **without any database** (pure frontend mode).\
-   ✅ Works **without authentication** (guest mode).\
-   ✅ Works with **Prisma + PostgreSQL** if `DATABASE_URL` is
    provided.\
-   ✅ Works with **Clerk Authentication** if Clerk credentials are
    provided.\
-   ✅ If **both DB and Clerk** are provided → Clerk users are
    automatically synced into the Prisma database on first login.

------------------------------------------------------------------------

## ⚙️ Features

-   **Environment-driven setup**\
    You only configure what you need.

-   **Prisma ORM (Optional)**\
    Automatically initializes when `DATABASE_URL` is present.

-   **Clerk Auth (Optional)**\
    Automatically wraps your app with Clerk when Clerk keys are
    provided.

-   **User Sync**\
    If both DB + Clerk are configured, every Clerk login syncs the user
    into the Prisma DB.

-   **Middleware**

    -   With Clerk → `authMiddleware` protects routes.\
    -   Without Clerk → falls back to `NextResponse.next()` (no-op).

------------------------------------------------------------------------

## 📦 Installation

Clone this repo and install dependencies:

``` bash
git clone https://github.com/your-username/next-flexible-starter.git
cd next-flexible-starter
npm install   # or pnpm install / yarn install
```

------------------------------------------------------------------------

## 🔑 Environment Variables

Create a `.env.local` file in the root:

``` bash
# Database (Optional)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Clerk (Optional)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-publishable-key"
CLERK_SECRET_KEY="your-secret-key"
```
 run ``` npm install``` after setting up environment variables

> Leave variables empty if you don't need that feature.

------------------------------------------------------------------------

## 🏗️ Running the Project

### Development

``` bash
npm dev
```

### Production

``` bash
npm build
npm start
```

------------------------------------------------------------------------

## 🛠️ How it Works

### Environment Config (`env.ts`)

``` ts
export const env = {
  DB_URL: process.env.DATABASE_URL ?? "",
  CLERK_PUBLISHABLE: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "",
  CLERK_SECRET: process.env.CLERK_SECRET_KEY ?? "",
};

export const features = {
  db: !!env.DB_URL,
  clerk: !!(env.CLERK_PUBLISHABLE && env.CLERK_SECRET),
  get both() {
    return this.db && this.clerk;
  },
};
```

-   `features.db` → true if DB is configured.\
-   `features.clerk` → true if Clerk is configured.\
-   `features.both` → true if **both** are configured.

------------------------------------------------------------------------

### Database Setup

Only initialized when `DATABASE_URL` exists.

``` ts
import { PrismaClient } from "@prisma/client";
import { features } from "@/env";

export let prisma: PrismaClient | null = null;

if (features.db) {
  prisma = new PrismaClient();
}
```

------------------------------------------------------------------------

### Clerk Middleware

If Clerk is available → wrap with Clerk's `authMiddleware`.\
Else → fallback middleware that just allows requests.

``` ts
import { features } from "@/env";

if (features.clerk) {
  import { authMiddleware } from "@clerk/nextjs";

  export default authMiddleware();
  export const config = { matcher: ["/((?!.*\..*|_next).*)", "/", "/(api|trpc)(.*)"] };
} else {
  import { NextResponse } from "next/server";

  export default function middleware() {
    return NextResponse.next();
  }
  export const config = { matcher: ["/((?!.*\..*|_next).*)", "/", "/(api|trpc)(.*)"] };
}
```

------------------------------------------------------------------------

### Clerk → Prisma User Sync

When both DB + Clerk are enabled, Clerk users are synced into Prisma on
first login.

``` ts
import { prisma } from "./db";
import { features } from "@/env";
import type { User } from "@clerk/nextjs/server";

export async function syncClerkUser(clerkUser: User) {
  if (!features.both || !prisma) return;

  await prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    update: {
      email: clerkUser.emailAddresses[0]?.emailAddress ?? null,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
    },
    create: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? null,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
    },
  });
}
```

------------------------------------------------------------------------

## 🗄️ Prisma Schema

Make sure your schema has a `User` model for Clerk syncing:

``` prisma
model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String?
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Run migrations:

``` bash
pnpm prisma migrate dev --name init
```

------------------------------------------------------------------------

## 🔮 Scenarios

| Scenario                                                              | Behavior                                                                 |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| No DB + No Clerk                                                      | Frontend-only app, no auth.                                              |
| DB only (`DATABASE_URL`)                                              | Database available, but no auth.                                         |
| Clerk only (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY`) | Auth works, no database storage.                                         |
| DB + Clerk both                                                       | Auth + Database, Clerk users automatically synced to Prisma `User` table |

## 📜 License

MIT © Your Name