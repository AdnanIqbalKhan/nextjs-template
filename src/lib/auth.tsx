import React from "react";
import { features } from "./env";
import { ClerkProvider } from "@clerk/nextjs";

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  // If Clerk is disabled, render children directly
  if (!features.clerk) {
    return <>{children}</>;
  }
  return <ClerkProvider>{children}</ClerkProvider>;
}
