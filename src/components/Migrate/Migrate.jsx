import React, { useState } from "react";
import { Button } from "../Button";
import { toast } from "sonner";
export default function MigratePage() {
	const [importText, setImportText] = useState("");

	// 📥 Merge imported groups into existing groups
	const handleImport = () => {
		try {
			const pastedGroups = JSON.parse(importText); // array expected
			if (!Array.isArray(pastedGroups)) {
				toast.error("Invalid JSON! Expected an array.");
				return;
			}

			// get current groups from localStorage
			const existingRaw = localStorage.getItem("groups");
			let existingGroups = [];
			if (existingRaw) {
				try {
					existingGroups = JSON.parse(existingRaw);
				} catch {
					existingGroups = [];
				}
			}

			// merge logic
			const mergedGroups = [...existingGroups];

			pastedGroups.forEach((pastedGroup) => {
				const existingIndex = mergedGroups.findIndex(
					(g) => g.name === pastedGroup.name
				);

				if (existingIndex >= 0) {
					// merge keys into existing group
					const existingKeys = mergedGroups[existingIndex].keys || [];
					const newKeys = pastedGroup.keys || [];
					mergedGroups[existingIndex].keys = [
						...existingKeys,
						...newKeys,
					];
				} else {
					// add new group entirely
					mergedGroups.push(pastedGroup);
				}
			});

			// save merged
			localStorage.setItem("groups", JSON.stringify(mergedGroups));
			toast.success("✅ Keys merged and imported successfully!");
			setImportText("");
		} catch (err) {
			console.error(err);
			toast.error("❌ Invalid JSON format!");
		}
	};

	// 📤 Export current groups to clipboard
	const handleExport = async () => {
		const data = localStorage.getItem("groups");
		if (!data) {
			toast.warning("⚠️ No groups data found in localStorage!");
			return;
		}
		try {
			await navigator.clipboard.writeText(data);
			toast.success("📋 Keys copied to clipboard!");
		} catch (err) {
			console.error(err);
			toast.error("❌ Failed to copy!");
		}
	};

	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
			<h1 className="text-3xl font-bold mb-8">
				🔑 Migrate API Vault Keys
			</h1>

			<div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
				{/* Import Section */}
				<div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">
					<h2 className="text-xl font-semibold mb-4">
						📥 Import / Paste Keys
					</h2>
					<textarea
						value={importText}
						onChange={(e) => setImportText(e.target.value)}
						placeholder='Paste JSON array of "groups" here...'
						rows={8}
						className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none text-white text-sm"
					/>
					<div className="mt-4">
						<Button onClick={handleImport}>Import Keys</Button>
					</div>
				</div>

				{/* Export Section */}
				<div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">
					<h2 className="text-xl font-semibold mb-4">
						📤 Export / Migrate Keys
					</h2>
					<p className="text-sm text-gray-400 mb-4">
						Click below to copy your current <code>groups</code>{" "}
						from localStorage to your clipboard.
					</p>
					<Button onClick={handleExport}>
						Copy Keys to Clipboard
					</Button>
				</div>
			</div>
		</div>
	);
}
