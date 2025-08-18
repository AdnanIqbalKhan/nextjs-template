import { features } from "@/lib/env";
import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

let middleware;
if (features.clerk) {
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
