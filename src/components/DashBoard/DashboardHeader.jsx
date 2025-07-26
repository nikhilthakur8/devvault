import React from "react";

export default function DashboardHeader({ totalKeys }) {
	return (
		<div className="text-left w-full mb-4">
			<h2 className="text-2xl md:text-3xl font-bold text-white">
				You have <span className="text-blue-400">{totalKeys}</span> keys
				stored locally
			</h2>
		</div>
	);
}
