"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useIsMobile, isMobileViewport } from "./sidebar-mobile-utils";
import type { SidebarProviderProps, SidebarState } from "./sidebar-state-types";

const SidebarContext = createContext<SidebarState>({ minimal: false, mobile: false, mobileOpen: false, toggle: () => undefined });

export function SidebarProvider({ children, expandedWidth = 240, mobileOverlay = false }: SidebarProviderProps) {
	const mobile = useIsMobile() && mobileOverlay;
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);
	useEffect(() => { setMobileOpen(false); }, [pathname, mobile]);
	const [minimal, setMinimal] = useState(false);
	const [storageKey, setStorageKey] = useState<string | null>(null);

	useEffect(() => {
		void fetch("/api/auth/me", { cache: "no-store" })
			.then((response) => response.json() as Promise<{ user?: { id?: string } }>)
			.then((data) => {
				if (!data.user?.id) return;
				const key = `mailflare-sidebar-minimal:${data.user.id}`;
				setStorageKey(key);
				try { setMinimal(localStorage.getItem(key) === "true"); } catch {}
			}).catch(() => undefined);
	}, []);

	function toggle() {
		if (mobile) { setMobileOpen((open) => !open); return; }
		setMinimal((current) => {
			const next = !current;
			if (storageKey && !isMobileViewport()) localStorage.setItem(storageKey, String(next));
			return next;
		});
	}

	return (
		<SidebarContext.Provider value={{ minimal: mobile ? false : minimal, mobile, mobileOpen, toggle }}>
			<div className="h-full" style={{ "--sidebar-width": `${minimal ? 72 : expandedWidth}px` } as React.CSSProperties}>
				{children}
			</div>
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	return useContext(SidebarContext);
}
