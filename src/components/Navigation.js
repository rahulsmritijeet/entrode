'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="glass sticky top-0 z-50 border-b theme-border">
      <div className="container-main h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text">
          ENTRODE
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/explore" className="theme-text hover:theme-accent transition-colors">
            Explore
          </Link>
          
          {user ? (
            <>
              <Link href="/profile" className="theme-text hover:theme-accent transition-colors">
                Profile
              </Link>
              <Link href="/create" className="btn btn-primary">
                Launch Startup
              </Link>
              <button onClick={logout} className="theme-text-secondary hover:theme-text transition-colors">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth" className="btn btn-outline">
              Sign In
            </Link>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}