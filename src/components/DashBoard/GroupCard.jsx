import { Eye, Key, Plus, Edit3, Trash2 } from "lucide-react";
import { Button } from "../Button";

export default function GroupCard({ group, onOpen, onEdit, onDelete, key }) {
	const handleEditClick = (e) => {
		e.stopPropagation(); // Prevent card click event
		onEdit(group.name);
	};

	const handleDeleteClick = (e) => {
		e.stopPropagation(); // Prevent card click event
		onDelete(group.name);
	};

	return (
		<div
			className="relative w-full bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl cursor-pointer"
			onClick={() => onOpen(group.name)}
			key={key}
		>
			{/* Background pattern */}
			<div className="absolute inset-0 rounded-2xl opacity-5">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl" />
			</div>

			{/* Action buttons */}
			<div className="absolute top-4 right-4 flex items-center gap-4 z-50">
				<button
					onClick={handleEditClick}
					className="text-blue-400 hover:text-blue-300 cursor-pointer"
					title="Edit Group"
				>
					<Edit3 className="w-5 h-5" />
				</button>
				<button
					onClick={handleDeleteClick}
					className="text-red-400 hover:text-red-300 cursor-pointer"
					title="Delete Group"
				>
					<Trash2 className="w-5 h-5" />
				</button>
			</div>

			{/* Main content */}
			<div className="relative z-10">
				{/* Header */}
				<div className="flex items-start justify-between pr-14">
					<div className="flex-1">
						<h3 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
							{group.name}
						</h3>
						<p className="text-zinc-500 text-sm mt-1 font-medium">
							API Key Collection
						</p>
					</div>
				</div>

				{/* Stats section */}
				<div className="mt-6 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-500/20">
							<div className="flex items-center gap-2">
								<Key className="w-4 h-4 text-blue-400" />
								<span className="text-white font-semibold">
									{group.keys.length}
								</span>
								<span className="text-zinc-400 text-sm">
									keys
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom decorative line */}
				<div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
			</div>
		</div>
	);
}
