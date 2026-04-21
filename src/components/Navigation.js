'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container-main nav-row">
        <Link href="/" className="brand">ENTRODE</Link>
        <div className="nav-right">
          {user ? (
            <button onClick={logout} className="nav-logout">Logout</button>
          ) : (
            <Link href="/auth" className="nav-cta">Sign In</Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
