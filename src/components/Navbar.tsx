'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/browse', label: 'Browse' },
    { href: '/profile', label: 'My Profile' },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="bg-white border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight hover:text-gray-500 transition">
          [ allegedlydating ]
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-bold uppercase tracking-wide transition ${
                pathname === link.href
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleSignOut}
              className="border-2 border-black px-5 py-2 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-black transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-black text-white px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-black"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t-2 border-black py-4 px-4 sm:px-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold uppercase tracking-wide py-3 hover:bg-gray-100 px-2 transition"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleSignOut}
              className="block w-full text-left text-sm font-bold uppercase tracking-wide py-3 hover:bg-gray-100 px-2 transition"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-bold uppercase tracking-wide py-3 hover:bg-gray-100 px-2 transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setMobileOpen(false)}
                className="block bg-black text-white text-xs font-black uppercase tracking-widest text-center py-3 mt-2"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
