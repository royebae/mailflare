"use client";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import { useSidebar } from "./sidebar-state";
import { cn } from "@/lib/utils";

export function SidebarAside({ children, className }: { children: ReactNode; className?: string }) {
  const { mobile, mobileOpen, toggle } = useSidebar();
  const hidden = mobile && !mobileOpen;
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") toggle(); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [mobileOpen, toggle]);
  return <>
    <div onClick={toggle} aria-hidden="true" className={cn("fixed inset-0 z-[100] bg-black/40 md:hidden", mobileOpen ? "" : "hidden")} />
    <aside aria-hidden={hidden} inert={hidden} className={cn("fixed inset-y-0 left-0 z-[110] w-[min(85vw,300px)] bg-[#f6f8fc] min-h-0 overflow-y-auto overscroll-contain px-3 py-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] transition-transform motion-reduce:transition-none md:relative md:z-30 md:w-auto md:translate-x-0", mobileOpen ? "translate-x-0 shadow-xl md:shadow-none" : "-translate-x-full", className)}>{children}</aside>
  </>;
}
export function MobileMenuButton() {
  const { mobile, mobileOpen, toggle } = useSidebar();
  if (!mobile) return null;
  return <button type="button" onClick={toggle} aria-label="Open menu" aria-expanded={mobileOpen} className="ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-200 md:hidden"><Menu size={20} /></button>;
}
