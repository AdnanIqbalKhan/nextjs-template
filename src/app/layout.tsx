import type { Metadata } from "next";
import "./globals.css";
import { AppAuthProvider } from "@/lib/auth";
export const metadata: Metadata = {
  title: "CodedByAi",
  description: "A platform for AI-powered coding solutions",
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
          <main className="max-w-4xl mx-auto p-6">{children}</main>
        </AppAuthProvider>
      </body>
    </html>
  );
}
