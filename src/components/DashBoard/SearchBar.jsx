export default function SearchBar({ search, setSearch }) {
	return (
		<input
			type="text"
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			placeholder="Search API groups or keys..."
			className="w-full px-4 py-2 rounded-md bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-3 focus:ring-blue-500/50"
		/>
	);
}
