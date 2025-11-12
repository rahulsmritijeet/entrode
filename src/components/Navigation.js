'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const active = (p) => pathname === p;

  return (
    <nav className="navbar">
      <div className="container-main nav-row">
        <Link href="/" className="brand">ENTRODE</Link>
        <div className="nav-links">
          <Link href="/explore" className={`nav-link ${active('/explore') ? 'active' : ''}`}>Explore</Link>
          <Link href="/create" className={`nav-link ${active('/create') ? 'active' : ''}`}>Create</Link>
          <Link href="/profile" className={`nav-link ${active('/profile') ? 'active' : ''}`}>Profile</Link>
          <Link href="/auth" className="nav-cta">Sign In</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
