import type { ReactNode } from "react";

export type SidebarState = {
	minimal: boolean;
	mobile: boolean;
	mobileOpen: boolean;
	toggle(): void;
};

export type SidebarProviderProps = {
	children: ReactNode;
	expandedWidth?: number;
	mobileOverlay?: boolean;
};

export type SidebarHeaderProps = {
	href: string;
	label?: string;
};
