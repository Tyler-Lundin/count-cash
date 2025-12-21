"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { TOOLS } from "../lib/tools";
import Logo from "./Logo";
import ThemeMenu from "./ThemeMenu";

type Tool = {
  href: string;
  title: string;
  desc: string;
};

export default function NavMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <MobileTopDrawerNav open={open} setOpen={setOpen} tools={TOOLS} />
      <DesktopDropdownNav open={open} setOpen={setOpen} tools={TOOLS} />
    </>
  );
}

/* -------------------------------- Mobile -------------------------------- */

function MobileTopDrawerNav({
  open,
  setOpen,
  tools,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tools: Tool[];
}) {
  // Tab height is used to keep the pull tab peeking when closed.
  const TAB_H = 36; // px

  return (
    <div className="sm:hidden">
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sliding group (drawer + tab move together) */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50"
        initial={false}
        animate={{
          // Closed: hide drawer above viewport, leave tab visible at top edge
          y: open ? 0 : `calc(-100% + ${TAB_H}px)`,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.6 }}
      >
        <MobileDrawerSurface>
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="text-sm font-medium">Tools</div>
            <ThemeMenu />
          </div>
          <MobileDrawerList tools={tools} onNavigate={() => setOpen(false)} />
        </MobileDrawerSurface>

        <MobilePullTab open={open} onToggle={() => setOpen((v) => !v)} />
      </motion.div>
    </div>
  );
}

function MobileDrawerSurface({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full border-b border-neutral-200 dark:border-neutral-800 bg-[var(--background)] text-[var(--foreground)] backdrop-blur shadow-lg">
      {children}
    </div>
  );
}

function MobileDrawerList({
  tools,
  onNavigate,
}: {
  tools: Tool[];
  onNavigate: () => void;
}) {
  return (
    <ul className="py-2">
      {tools.map((t) => (
        <li key={t.href}>
          <Link
            href={t.href}
            onClick={onNavigate}
            className="block px-4 py-3 active:bg-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div className="text-sm font-medium">{t.title}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {t.desc}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobilePullTab({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex justify-center pb-2">
      <button
        type="button"
        aria-label={open ? "Close tools menu" : "Open tools menu"}
        aria-expanded={open}
        onClick={onToggle}
        className="
          group relative h-10 w-[92px] rounded-b-3xl
          bg-white/85 dark:bg-neutral-950/80
          backdrop-blur-xl
          border-x border-b border-neutral-200/70 dark:border-neutral-800/70
          shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)]
          active:scale-[0.98]
          transition
        "
      >
        {/* subtle top highlight */}
        <div className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/10" />

        {/* handle */}
        <div
          className="
            mx-auto mt-[15px] h-1.5 w-11 rounded-full
            bg-neutral-300/90 dark:bg-neutral-700/80
            group-hover:bg-neutral-400/90 dark:group-hover:bg-neutral-600/90
            transition
          "
        />
      </button>
    </div>
  );
}


/* ------------------------------- Desktop -------------------------------- */

function DesktopDropdownNav({
  open,
  setOpen,
  tools,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tools: Tool[];
}) {
  return (
    <div className="hidden sm:block pointer-events-auto relative mx-auto  px-4 pt-4 z-30">
      <div className="flex justify-end">
        <Logo /> 
        <div className="ml-auto mr-2"><ThemeMenu /></div>
        <DesktopMenuButton open={open} onToggle={() => setOpen((v) => !v)} />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-20 bg-black/20 dark:bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              key="desktop-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-30 mt-2 w-[min(92vw,320px)] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[var(--background)] text-[var(--foreground)] shadow-lg"
            >
              <ul className="p-2">
                {tools.map((t) => (
                  <li key={t.href}>
                    <Link
                      href={t.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg p-3 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    >
                      <div className="text-sm font-medium">{t.title}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        {t.desc}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopMenuButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className="h-8 w-8 rounded-full bg-blue-100/60 dark:bg-neutral-900/60 hover:bg-white/80 dark:hover:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300/60 dark:focus:ring-neutral-700/60"
    >
      {open ? <IconX /> : <IconMenu />}
    </button>
  );
}

function IconMenu() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconX() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
