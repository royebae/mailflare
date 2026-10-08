"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isActiveSettingsPath, settingsNavSections } from "./settings-nav-utils";

export function SettingsNav() {
	const pathname = usePathname();

	return (
		<aside className="w-full shrink-0 border-b md:border-b-0 md:border-r border-blue-100/70 px-4 py-3 md:py-10 md:w-64">
			<div className="flex gap-4 overflow-x-auto md:block md:sticky md:top-6 md:space-y-7">
				{settingsNavSections.map((section) => (
					<div key={section.label} className="shrink-0 space-y-3">
						<h2 className="px-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
							{section.label}
						</h2>
						<nav className="flex md:block md:space-y-px">
							{section.items.map((item) => {
								const active = isActiveSettingsPath(pathname, item.href);
								return (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"block whitespace-nowrap rounded-full px-4 py-3 md:py-1.5 text-sm font-medium transition-colors",
											active
												? "bg-blue-100 text-blue-900"
												: "text-neutral-600 hover:bg-white/70 hover:text-neutral-900",
										)}
									>
										{item.label}
									</Link>
								);
							})}
						</nav>
					</div>
				))}
			</div>
		</aside>
	);
}
