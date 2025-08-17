import type { Metadata } from "next";
import "./globals.css";
import { AppAuthProvider } from "@/lib/auth";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Next Template (Optional Auth & DB)",
  description: "Bootstrapped with Tailwind + shadcn + optional Prisma/Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppAuthProvider>
          <Header />
          <main className="max-w-4xl mx-auto p-6">{children}</main>
        </AppAuthProvider>
      </body>
    </html>
  );
}
