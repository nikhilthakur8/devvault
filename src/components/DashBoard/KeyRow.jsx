import { Trash2 } from "lucide-react";

export default function KeyRow({ data, onDelete }) {
	return (
		<div className="flex justify-between items-center bg-zinc-800 px-4 py-2 rounded-md mb-2">
			<div>
				<p className="text-white font-medium">{data.name}</p>
				<p className="text-zinc-400 text-sm break-all">{data.key}</p>
			</div>
			<button
				onClick={onDelete}
				className="text-red-400 hover:text-red-500"
			>
				<Trash2 className="w-5 h-5" />
			</button>
		</div>
	);
}
