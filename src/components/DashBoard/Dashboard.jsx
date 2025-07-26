"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import SearchBar from "./SearchBar";
import GroupCard from "./GroupCard";
import GroupDialog from "./GroupDialog";
import { Plus, Edit3, Trash2, X, Save } from "lucide-react";
import { Button } from "../Button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function Dashboard() {
	const [search, setSearch] = useState("");
	const [groups, setGroups] = useState([]);
	const [dialogGroupName, setDialogGroupName] = useState(null);
	const [showAddDialog, setShowAddDialog] = useState(false);
	const [showEditDialog, setShowEditDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [newGroupName, setNewGroupName] = useState("");

	useEffect(() => {
		const storedGroups = localStorage.getItem("groups");
		if (storedGroups) {
			setGroups(JSON.parse(storedGroups));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("groups", JSON.stringify(groups));
	}, [groups]);

	const handleAddKey = (groupName, keyData) => {
		setGroups((prev) =>
			prev.map((g) =>
				g.name === groupName
					? {
							...g,
							keys: [
								{
									id: Date.now(),
									name: keyData.name,
									key: keyData.key,
								},
								...g.keys,
							],
					  }
					: g
			)
		);
		toast.success("Key added successfully");
	};

	const handleDeleteKey = (groupName, keyId) => {
		setGroups((prev) =>
			prev.map((g) =>
				g.name === groupName
					? { ...g, keys: g.keys.filter((k) => k.id !== keyId) }
					: g
			)
		);
		toast.success("Key deleted successfully");
	};

	const handleAddGroup = () => {
		if (!newGroupName.trim()) {
			toast.error("Please enter a group name");
			return;
		}
		if (groups.find((g) => g.name === newGroupName.trim())) {
			toast.error("Group with this name already exists");
			return;
		}
		setGroups([...groups, { name: newGroupName.trim(), keys: [] }]);
		toast.success("Group added successfully");
		setNewGroupName("");
		setShowAddDialog(false);
	};

	const handleEditGroup = () => {
		if (!newGroupName.trim()) {
			toast.error("Please enter a group name");
			return;
		}
		if (
			groups.find(
				(g) =>
					g.name === newGroupName.trim() && g.name !== selectedGroup
			)
		) {
			toast.error("Group with this name already exists");
			return;
		}
		setGroups((prev) =>
			prev.map((g) =>
				g.name === selectedGroup
					? { ...g, name: newGroupName.trim() }
					: g
			)
		);
		toast.success("Group updated successfully");
		setNewGroupName("");
		setShowEditDialog(false);
		setSelectedGroup(null);
	};
	console.log(groups);
	const handleDeleteGroup = () => {
		setGroups((prev) => prev.filter((g) => g.name !== selectedGroup));
		toast.success("Group deleted successfully");
		setShowDeleteDialog(false);
		setSelectedGroup(null);
	};

	const handleEditKey = (groupName, keyId, newData) => {
		setGroups((prev) =>
			prev.map((group) =>
				group.name === groupName
					? {
							...group,
							keys: group.keys.map((key) =>
								key.id === keyId
									? {
											...key,
											name: newData.name,
											key: newData.key,
									  }
									: key
							),
					  }
					: group
			)
		);
		toast.success("Key updated successfully");
	};

	const openEditDialog = (groupName) => {
		setSelectedGroup(groupName);
		setNewGroupName(groupName);
		setShowEditDialog(true);
	};

	const openDeleteDialog = (groupName) => {
		setSelectedGroup(groupName);
		setShowDeleteDialog(true);
	};

	const filteredGroups = groups.filter((group) =>
		group.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="bg-black pt-32 space-y-8 text-white min-h-screen px-6 py-10">
			<div className="max-w-4xl mx-auto space-y-8">
				{/* Header */}
				<div className="flex items-center justify-between">
					<DashboardHeader
						totalKeys={groups.reduce(
							(a, b) => a + b.keys.length,
							0
						)}
					/>
					<Button
						className="!text-base whitespace-nowrap rounded-lg"
						onClick={() => setShowAddDialog(true)}
					>
						<Plus className="mr-2 inline" size={16} />
						Add Group
					</Button>
				</div>

				{/* Search */}
				<SearchBar search={search} setSearch={setSearch} />

				{/* Groups Grid */}
				<div className="grid grid-cols-2 gap-6">
					{filteredGroups.map((group) => (
						<GroupCard
							key={group.name}
							group={group}
							onOpen={setDialogGroupName}
							onEdit={openEditDialog}
							onDelete={openDeleteDialog}
						/>
					))}
				</div>

				{/* Empty State */}
				{filteredGroups.length === 0 && (
					<div className="text-center py-12">
						<div className="text-zinc-400 text-lg">
							{search ? "No groups found" : "No groups yet"}
						</div>
						<div className="text-zinc-500 text-sm mt-2">
							{search
								? "Try a different search"
								: "Create your first group to get started"}
						</div>
					</div>
				)}

				{/* Group Dialog */}
				{dialogGroupName && (
					<GroupDialog
						group={groups.find((g) => g.name === dialogGroupName)}
						isOpen={!!dialogGroupName}
						onClose={() => setDialogGroupName(null)}
						onAddKey={handleAddKey}
						onEditKey={handleEditKey}
						onDeleteKey={handleDeleteKey}
					/>
				)}

				{/* Add Group Dialog */}
				<Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
					<DialogContent className="bg-zinc-900 border border-zinc-700 text-white">
						<DialogHeader>
							<DialogTitle className="text-xl font-semibold">
								Add New Group
							</DialogTitle>
						</DialogHeader>
						<div className="space-y-4 pt-4">
							<input
								type="text"
								placeholder="Enter group name..."
								value={newGroupName}
								onChange={(e) =>
									setNewGroupName(e.target.value)
								}
								className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								autoFocus
								onKeyDown={(e) =>
									e.key === "Enter" && handleAddGroup()
								}
							/>
							<div className="flex gap-3 justify-end">
								<Button
									variant="outline"
									onClick={() => {
										setShowAddDialog(false);
										setNewGroupName("");
									}}
								>
									Cancel
								</Button>
								<Button onClick={handleAddGroup}>
									<Plus className="mr-2" size={16} />
									Add Group
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>

				{/* Edit Group Dialog */}
				<Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
					<DialogContent className="bg-zinc-900 border border-zinc-700 text-white">
						<DialogHeader>
							<DialogTitle className="text-xl font-semibold">
								Edit Group Name
							</DialogTitle>
						</DialogHeader>
						<div className="space-y-4 pt-4">
							<input
								type="text"
								placeholder="Enter group name..."
								value={newGroupName}
								onChange={(e) =>
									setNewGroupName(e.target.value)
								}
								className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								autoFocus
								onKeyDown={(e) =>
									e.key === "Enter" && handleEditGroup()
								}
							/>
							<div className="flex gap-3 justify-end">
								<Button
									variant="outline"
									onClick={() => {
										setShowEditDialog(false);
										setNewGroupName("");
										setSelectedGroup(null);
									}}
								>
									Cancel
								</Button>
								<Button onClick={handleEditGroup}>
									<Save className="mr-2" size={16} />
									Update
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>

				{/* Delete Group Dialog */}
				<Dialog
					open={showDeleteDialog}
					onOpenChange={setShowDeleteDialog}
				>
					<DialogContent className="bg-zinc-900 border border-zinc-700 text-white">
						<DialogHeader>
							<DialogTitle className="text-xl font-semibold">
								Delete Group
							</DialogTitle>
						</DialogHeader>
						<div className="space-y-4 pt-4">
							<p className="text-zinc-300">
								Are you sure you want to delete{" "}
								<span className="font-semibold text-white">
									"{selectedGroup}"
								</span>
								?
							</p>
							<p className="text-zinc-400 text-sm">
								This will permanently delete the group and all
								its keys. This action cannot be undone.
							</p>
							<div className="flex gap-3 justify-end">
								<Button
									variant="outline"
									onClick={() => {
										setShowDeleteDialog(false);
										setSelectedGroup(null);
									}}
								>
									Cancel
								</Button>
								<Button
									variant="destructive"
									onClick={handleDeleteGroup}
								>
									<Trash2 className="mr-2" size={16} />
									Delete
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
