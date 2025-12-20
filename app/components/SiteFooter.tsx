"use client";
import Link from "next/link";
import React from "react";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 border-t border-neutral-200/70 dark:border-neutral-800/70">
      <div className="mx-auto max-w-md px-4 py-6 text-center text-xs text-neutral-500">
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

