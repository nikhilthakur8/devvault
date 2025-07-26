"use client";

import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Shield, Search, Lock, ChevronRight, Sparkles } from "lucide-react";

export default function Home() {
	return (
		<main className="relative bg-black text-white h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
			{/* Background effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

			{/* Animated gradient orbs */}
			<div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
			<div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />

			{/* Grid pattern overlay */}
			<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

			{/* Main content */}
			<div className="relative z-10 max-w-5xl flex flex-col items-center mx-auto text-center">
				{/* Feature badges */}
				<div className="flex flex-wrap gap-3 justify-center mb-8">
					<div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
						<Shield className="w-4 h-4 text-blue-400" />
						<span className="text-sm text-blue-300">
							End-to-End Encrypted
						</span>
					</div>
					<div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
						<Search className="w-4 h-4 text-green-400" />
						<span className="text-sm text-green-300">
							Instant Search
						</span>
					</div>
					<div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
						<Lock className="w-4 h-4 text-purple-400" />
						<span className="text-sm text-purple-300">
							100% Offline
						</span>
					</div>
				</div>

				{/* Main heading */}
				<h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
						Secure
					</span>
					,{" "}
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
						Searchable
					</span>
					,
					<br />
					and{" "}
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
						Private
					</span>{" "}
					<span className="relative">
						API Vault
						<Sparkles className="absolute -top-6 -right-6 w-8 h-8 text-yellow-400 animate-pulse" />
					</span>
					.
				</h1>

				{/* Subtitle */}
				<p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-4 leading-relaxed">
					The ultimate solution to{" "}
					<span className="text-white font-semibold">
						store, manage, and organize
					</span>{" "}
					all your API keys
					<br className="hidden md:block" />
					with{" "}
					<span className="text-white font-semibold">
						zero cloud dependency
					</span>
					.
				</p>

				<Link to="/Dashboard">
					<Button
						variant="purple"
						className="py-2.5 text-lg md:text-xl font-semibold "
					>
						<span>Get Started</span>
						<ChevronRight className="w-5 h-5 ml-2 inline " />
					</Button>
				</Link>
			</div>
		</main>
	);
}
