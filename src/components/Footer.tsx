export default function Footer() {
  return (
    <footer className="border-t-2 border-black mt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-wide">Allegedly Dating</span>
        <p className="text-xs font-mono text-gray-500 uppercase tracking-wide">
          No games, no gimmicks — just real connections
        </p>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-wide text-gray-500">
          <span className="hover:text-black transition cursor-pointer">Privacy</span>
          <span className="hover:text-black transition cursor-pointer">Terms</span>
          <span className="hover:text-black transition cursor-pointer">Contact</span>
        </div>
      </div>
    </footer>
  );
}
