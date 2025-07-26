import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "../ui/dialog";
import { useState, useRef, useEffect } from "react";
import { Plus, Save, X, Edit2, ClipboardCopy, Trash2 } from "lucide-react";
import SearchBar from "./SearchBar";
import { toast } from "sonner";
const handleCopy = (text) => {
	navigator.clipboard.writeText(text);
	toast.success("Copied to clipboard");
};
export default function GroupDialog({
	group,
	isOpen,
	onClose,
	onDeleteKey,
	onEditKey,
	onAddKey,
}) {
	const [search, setSearch] = useState("");
	const [adding, setAdding] = useState(false);
	const [newKey, setNewKey] = useState({ name: "", key: "" });

	const filteredKeys = group.keys.filter((key) =>
		key.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-zinc-900 border border-zinc-700 text-white min-w-4xl">
				<DialogHeader>
					<div className="flex justify-between items-center mt-5">
						<div>
							<DialogTitle className="text-xl font-semibold">
								{group.name} Keys
							</DialogTitle>
							<DialogDescription className="text-zinc-400">
								View, edit, and manage your API keys.
							</DialogDescription>
						</div>

						{/* Add Key Button */}
						<div className="space-x-4">
							<button
								onClick={() => {
									setAdding(true);
									setNewKey({ name: "", key: "" });
								}}
								title="Add new key"
								className="text-blue-400 hover:text-blue-300 p-1 border border-zinc-700 rounded-md cursor-pointer"
							>
								<Plus className="w-6 h-6" />
							</button>
							<button
								onClick={() =>
									handleCopy(
										group.keys
											.map((k) => `${k.name}="${k.key}"`)
											.join("\n")
									)
								}
								title="Copy All Keys"
								className="text-blue-400 hover:text-blue-300 p-1 border border-zinc-700 rounded-md cursor-pointer"
							>
								<ClipboardCopy className="w-6 h-6" />
							</button>
						</div>
					</div>
					<SearchBar search={search} setSearch={setSearch} />
				</DialogHeader>

				<div className="space-y-3 mt-2 px-1 pt-2 max-h-[55vh] overflow-y-auto hide-scrollbar">
					{/* NEW INPUT FIELD */}
					<NewKeyInput
						onAddKey={onAddKey}
						adding={adding}
						setAdding={setAdding}
						newKey={newKey}
						setNewKey={setNewKey}
						group={group}
					/>
					{/* EXISTING KEYS */}
					<ExistingKeys
						group={{ ...group, keys: filteredKeys }}
						onDeleteKey={onDeleteKey}
						onEditKey={onEditKey}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function Input({ placeholder, value, className, ...props }) {
	return (
		<input
			type="text"
			placeholder={placeholder || ""}
			value={value}
			className={`w-full pr-8 px-2 py-1 rounded outline-none text-white border ${className}`}
			{...props}
		/>
	);
}

function NewKeyInput({
	onAddKey,
	adding,
	setAdding,
	newKey,
	setNewKey,
	group,
}) {
	const nameInputRef = useRef(null);
	useEffect(() => {
		if (adding && nameInputRef.current) {
			nameInputRef.current.focus();
		}
	}, [adding]);
	return (
		adding && (
			<div className="flex items-center justify-between bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg">
				<div className="flex-1 space-y-2 ">
					{/* Name input */}
					<div className="relative">
						<Input
							placeholder="Key name"
							ref={nameInputRef}
							value={newKey.name}
							onChange={(e) =>
								setNewKey({
									...newKey,
									name: e.target.value,
								})
							}
							autoFocus={true}
							className=" bg-zinc-700 border border-zinc-600 outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							onClick={() => handleCopy(newKey.name)}
							className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-400"
							title="Copy name"
						>
							<ClipboardCopy className="w-4 h-4" />
						</button>
					</div>

					{/* Key input */}
					<div className="relative">
						<input
							value={newKey.key}
							onChange={(e) =>
								setNewKey({
									...newKey,
									key: e.target.value,
								})
							}
							className="w-full pr-8 px-2 py-1 rounded text-white bg-zinc-700 border border-zinc-600 outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Key value"
						/>
						<button
							onClick={() => handleCopy(newKey.key)}
							className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-400 cursor-pointer"
							title="Copy key"
						>
							<ClipboardCopy className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* Save & Cancel Buttons */}
				<div className="flex space-x-2 ml-4 pt-1">
					<button
						onClick={() => {
							if (!newKey.name || !newKey.key) return;
							onAddKey(group.name, newKey);
							setAdding(false);
							setNewKey({ name: "", key: "" });
						}}
						title="Save"
						className="text-green-400 hover:text-green-300 cursor-pointer"
					>
						<Save className="w-6 h-6" />
					</button>
					<button
						onClick={() => {
							setAdding(false);
							setNewKey({ name: "", key: "" });
						}}
						title="Cancel"
						className="text-red-400 hover:text-red-300 cursor-pointer"
					>
						<X className="w-6 h-6" />
					</button>
				</div>
			</div>
		)
	);
}

function ExistingKeys({ group, onDeleteKey, onEditKey }) {
	const [editingId, setEditingId] = useState(null);
	const [editedKey, setEditedKey] = useState("");
	const [editedName, setEditedName] = useState("");
	return group.keys.map((key) => {
		const isEditing = editingId === key.id;
		return (
			<div
				key={key.id}
				className="flex items-center justify-between bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-lg"
			>
				<div className="flex-1 space-y-2">
					{/* Name */}
					<div
						className="relative z-50"
						onClick={() => !isEditing && handleCopy(key.name)}
					>
						<Input
							value={isEditing ? editedName : key.name}
							onChange={(e) => setEditedName(e.target.value)}
							readOnly={!isEditing}
							className={
								isEditing
									? "bg-zinc-700 border-zinc-600 focus:ring-2 focus:ring-blue-500"
									: "bg-zinc-900 border-zinc-800 text-zinc-400 cursor-pointer"
							}
						/>
						<button
							onClick={() => handleCopy(key.name)}
							title="Copy name"
							className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-400"
						>
							<ClipboardCopy className="w-4 h-4" />
						</button>
					</div>

					{/* Key */}
					<div
						className="relative"
						onClick={() => !isEditing && handleCopy(key.key)}
					>
						<Input
							value={isEditing ? editedKey : key.key}
							onChange={(e) => setEditedKey(e.target.value)}
							readOnly={!isEditing}
							className={
								isEditing
									? "bg-zinc-700 border-zinc-600 focus:ring-2 focus:ring-blue-500"
									: "bg-zinc-900 border-zinc-800 text-zinc-400 cursor-pointer"
							}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									onEditKey(group.name, key.id, {
										name: editedName,
										key: editedKey,
									});
									setEditingId(null);
								}
							}}
						/>
						<button
							onClick={() => handleCopy(key.key)}
							title="Copy key"
							className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-400"
						>
							<ClipboardCopy className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* Actions */}
				<div className="flex space-x-2 ml-4 pt-1">
					{isEditing ? (
						<>
							<button
								onClick={() => {
									onEditKey(group.name, key.id, {
										name: editedName,
										key: editedKey,
									});
									setEditingId(null);
								}}
								title="Save"
								className="text-green-400 hover:text-green-300 cursor-pointer"
							>
								<Save className="w-6 h-6" />
							</button>
							<button
								onClick={() => setEditingId(null)}
								title="Cancel"
								className="text-red-400 hover:text-red-300 cursor-pointer"
							>
								<X className="w-6 h-6" />
							</button>
						</>
					) : (
						<div className="flex space-x-4">
							<button
								onClick={() =>
									handleCopy(`${key.name}="${key.key}"`)
								}
								className="text-zinc-500 hover:text-blue-400 cursor-pointer"
								title="Copy key"
							>
								<ClipboardCopy className="w-6 h-6" />
							</button>
							<div className="flex flex-col space-y-4">
								<button
									onClick={() => {
										setEditingId(key.id);
										setEditedKey(key.key);
										setEditedName(key.name);
									}}
									title="Edit"
									className="text-yellow-400 hover:text-yellow-300"
								>
									<Edit2 className="w-6 h-6 cursor-pointer" />
								</button>
								<button
									onClick={() =>
										onDeleteKey(group.name, key.id)
									}
									title="Delete"
									className="text-red-400 hover:text-red-300"
								>
									<Trash2 className="w-6 h-6 cursor-pointer" />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	});
}
