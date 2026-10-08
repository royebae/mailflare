"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMailSearch } from "./mail-search-context";

export function MailSearchInput() {
	const { query, setQuery } = useMailSearch();
	const [expanded, setExpanded] = useState(false);
	const input = useRef<HTMLInputElement>(null);
	useEffect(() => { if (expanded) input.current?.focus(); }, [expanded]);

	return (
		<>
		<button type="button" aria-label="Search mail" onClick={() => setExpanded(true)} className={`ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-600 md:hidden ${expanded ? "hidden" : ""}`}><Search size={20} /></button>
		<div className={`h-12 min-w-0 flex-1 items-center gap-3 rounded-full bg-[#eaf1fb] px-4 text-neutral-600 md:flex ${expanded ? "flex max-md:fixed max-md:inset-x-2 max-md:top-2 max-md:z-[60]" : "max-md:hidden"}`}>
			<Search className="h-5 w-5 shrink-0" />
			<Input
				ref={input}
				onBlur={() => setExpanded(false)}
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				placeholder='Search mail'
				className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-neutral-800 outline-none! shadow-none! border-none! placeholder:text-neutral-500"
			/>
			{query && (
				<button
					type="button"
					onMouseDown={(event) => event.preventDefault()}
					onClick={() => setQuery("")}
					className="rounded-full p-1 text-neutral-500 hover:bg-blue-100 hover:text-neutral-800"
					aria-label="Clear search"
				>
					<X className="h-4 w-4" />
				</button>
			)}
		</div>
		</>
	);
}
