"use client";

import {
	Menu,
	X,
	KeyRound,
	Settings,
	BookOpen,
	LayoutDashboard,
	ArrowRightLeft,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
	const [open, setOpen] = useState(false);

	const navItems = [
		{
			name: "Dashboard",
			icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
			href: "/Dashboard",
		},
		{
			name: "Migrate",
			icon: <ArrowRightLeft className="w-5 h-5 mr-2" />,
			href: "/Migrate",
		},
		// {
		// 	name: "Docs",
		// 	icon: <BookOpen className="w-5 h-5 mr-2" />,
		// 	href: "/Docs",
		// },
		// {
		// 	name: "Settings",
		// 	icon: <Settings className="w-5 h-5 mr-2" />,
		// 	href: "/Settings",
		// },
	];

	return (
		<nav className="bg-black text-gray-300 border-b border-zinc-800 shadow-md fixed w-full top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
				{/* Logo / Brand */}
				<a
					href="/"
					className="text-2xl font-extrabold tracking-tight text-white hover:text-blue-500 transition"
				>
					ApiVault
				</a>

				{/* Desktop Nav */}
				<div className="hidden md:flex items-center gap-6">
					{navItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="flex items-center text-sm font-semibold hover:text-blue-400 transition-all px-2 py-1 rounded-md hover:bg-zinc-800"
						>
							{item.icon}
							{item.name}
						</a>
					))}
				</div>

				{/* Mobile toggle */}
				<div className="md:hidden">
					<button
						onClick={() => setOpen(!open)}
						className="text-gray-400 hover:text-white focus:outline-none"
					>
						{open ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Nav */}
			{open && (
				<div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-zinc-900 border-t border-zinc-800 shadow-inner">
					{navItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="flex items-center text-sm font-medium text-gray-300 hover:text-blue-400 transition-all"
						>
							{item.icon}
							{item.name}
						</a>
					))}
				</div>
			)}
		</nav>
	);
}
