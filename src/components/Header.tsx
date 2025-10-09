export function Header() {
  return (
    <nav className="w-full bg-neutral-900 text-white shadow-lg rotate-180">
      <div className="flex items-center justify-between px-10 py-4 text-sm font-medium">
        <span className="text-lg font-semibold">Navbar</span>

        <ul className="flex items-center gap-8">
          <li className="hover:text-cyan-300 cursor-pointer">Home</li>
          <li className="hover:text-cyan-300 cursor-pointer">Features</li>
          <li className="hover:text-cyan-300 cursor-pointer">Pricing</li>
          <li className="hover:text-cyan-300 cursor-pointer">About</li>
        </ul>

        <form className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search"
            className="rounded-md border border-gray-500 bg-white px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="rounded-md border border-cyan-400 text-cyan-300 px-4 py-2 text-xs font-semibold transition-colors hover:bg-cyan-400 hover:text-gray-900"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
