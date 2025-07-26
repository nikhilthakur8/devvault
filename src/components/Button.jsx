import React from "react";
import clsx from "clsx"; // Optional but recommended

const variantClasses = {
	blue: "bg-blue-500/20 hover:bg-blue-500/40 border-blue-300/20 text-blue-200",
	green: "bg-green-500/20 hover:bg-green-500/40 border-green-300/20 text-green-200",
	purple: "bg-purple-500/20 hover:bg-purple-500/40 border-purple-300/20 text-purple-200",
	red: "bg-red-500/20 hover:bg-red-500/40 border-red-300/20 text-red-200",
	yellow: "bg-yellow-400/20 hover:bg-yellow-400/40 border-yellow-300/20 text-yellow-100",
};

export const Button = ({
	children,
	variant = "blue",
	className = "",
	...props
}) => {
	const colorClasses = variantClasses[variant] || variantClasses.blue;

	return (
		<button
			{...props}
			className={clsx(
				"px-5 py-1 rounded-full flex items-center justify-center cursor-pointer font-medium backdrop-blur-md border shadow-md transition-all duration-200",
				colorClasses,
				className
			)}
		>
			{children}
		</button>
	);
};
