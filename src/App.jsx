import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Toaster } from "sonner";
export const App = () => {
	return (
		<div className="bg-zinc-800 min-h-screen">
			<Navbar />
			<Outlet />
			<Toaster richColors position="top-right" theme="dark" />
		</div>
	);
};
