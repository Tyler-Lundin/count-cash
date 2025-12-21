"use client";
import Link from "next/link";
import React from "react";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="">
      <div className="mx-auto max-w-md px-4 py-6 text-center text-xs text-[var(--foreground)]">
        <div className="space-x-3">
          <span>© {year}</span>
          <Link href="/privacy" className="underline-offset-2 hover:underline">
            Privacy
          </Link>
          <span>•</span>
          <Link href="/copyright" className="underline-offset-2 hover:underline">
            Copyright
          </Link>
          <span>•</span>
          <a
            href="https://tylerweb.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            Site by Tyler
          </a>
        </div>
      </div>
    </footer>
  );
}
