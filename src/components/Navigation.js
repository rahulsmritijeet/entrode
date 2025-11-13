'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
  }, [open]);

  const isActive = (p) => pathname === p;
  const close = () => setOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="container-main nav-row">
          <Link href="/" className="brand">ENTRODE</Link>

          <div className="nav-links hide-mobile">
            <Link href="/explore" className={`nav-link ${isActive('/explore') ? 'active' : ''}`}>Explore</Link>
            <Link href="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`}>Create</Link>
            <Link href="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>Profile</Link>

            {user ? (
              <div className="nav-auth">
                <Link href="/create" className="nav-cta">Launch</Link>
                <button onClick={logout} className="nav-logout">Logout</button>
                <ThemeToggle />
              </div>
            ) : (
              <div className="nav-auth">
                <Link href="/auth" className="nav-ghost">Sign In</Link>
                <Link href="/auth?mode=signup" className="nav-cta">Sign Up</Link>
                <ThemeToggle />
              </div>
            )}
          </div>

          <button
            aria-label="Menu"
            className={`ham-btn show-mobile ${open ? 'active' : ''}`}
            onClick={() => setOpen(!open)}
          >
            <span className="ham-inner">
              <span className="ham-line"></span>
              <span className="ham-line"></span>
              <span className="ham-line"></span>
            </span>
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />

      <aside className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="m-head">
          <div className="m-brand">ENTRODE</div>
          <button
            aria-label="Close"
            className={`ham-btn ${open ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            <span className="ham-inner">
              <span className="ham-line"></span>
              <span className="ham-line"></span>
              <span className="ham-line"></span>
            </span>
          </button>
        </div>

        <div className="m-body">
          <Link href="/explore" className="m-link" onClick={close}>Explore</Link>
          <Link href="/create" className="m-link" onClick={close}>Create</Link>
          <Link href="/profile" className="m-link" onClick={close}>Profile</Link>
          <div className="m-theme"><ThemeToggle /></div>
        </div>

        <div className="m-actions">
          {user ? (
            <>
              <Link href="/create" className="m-cta-primary" onClick={close}>Launch</Link>
              <button className="m-logout" onClick={() => { logout(); close(); }}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth" className="m-cta-secondary" onClick={close}>Sign In</Link>
              <Link href="/auth?mode=signup" className="m-cta-primary" onClick={close}>Sign Up</Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
