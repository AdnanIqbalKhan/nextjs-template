import { features } from "@/lib/env";
import { NextResponse } from "next/server";

let middleware;
if (features.clerk) {
  const clerkMiddleware = await import("@clerk/nextjs/server").then(
    (mod) => mod.clerkMiddleware
  );
  middleware = clerkMiddleware();
} else {
  middleware = function () {
    return NextResponse.next();
  };
}
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default middleware;
