"use client";

import Link from "next/link";
import { HelpCircle, Search } from "lucide-react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { ComposeProvider } from "@/components/compose/compose-context";
import { FloatingComposer } from "@/components/compose/floating-composer";
import { MailboxProvider } from "@/components/mailbox-provider";
import { MailboxSelector } from "@/components/mailbox-selector";
import { LicenseIndicator } from "@/components/license-indicator";
import { AdminNav } from "@/components/admin-nav";
import { SidebarAside, MobileMenuButton } from "@/components/sidebar-aside";
import { SidebarProvider } from "@/components/sidebar-state";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireMailbox requireRole="admin">
      <SidebarProvider expandedWidth={256} mobileOverlay>
      <MailboxProvider>
        <ComposeProvider>
          <div className="grid h-dvh grid-cols-[minmax(0,1fr)] md:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] overflow-hidden bg-[#f6f8fc] transition-[grid-template-columns] duration-200">
            <SidebarAside>
              <AdminNav />
            </SidebarAside>
            <div className="flex min-h-0 min-w-0 flex-col">
              <span className="flex h-16 shrink-0 items-center gap-2 px-2 md:fixed md:top-6 md:right-6 md:h-auto">
                <MobileMenuButton />
                <span className="flex-1" />
                <LicenseIndicator />
                <MailboxSelector />
              </span>
              <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain rounded-t-2xl md:rounded-tl-3xl px-4 py-4 md:px-6 md:py-10 scrollbar-gutter-stable lg:px-12">
                <div className="w-full max-w-3xl">{children}</div>
              </main>
            </div>
            <FloatingComposer />
          </div>
        </ComposeProvider>
      </MailboxProvider>
      </SidebarProvider>
    </AuthGuard>
  );
}
