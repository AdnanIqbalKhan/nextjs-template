import Link from "next/link";
import { Button } from "./ui/button";
import { features } from "@/lib/env";
import { SignInButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Next Template
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          {features.clerk && <SignInButton mode={"modal"} />}
        </nav>
      </div>
    </header>
  );
}
