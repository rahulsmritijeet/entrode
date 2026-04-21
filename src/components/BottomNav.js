'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'Home', icon: '' },
  { href: '/startups', label: 'Startups', icon: '' },
  { href: '/people', label: 'People', icon: '' },
  { href: '/profile', label: 'Profile', icon: '' }
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav">
      {items.map(it => {
        const active = pathname === it.href || (it.href !== '/' && pathname.startsWith(it.href));
        return (
          <Link key={it.href} href={it.href} className={`bn-item ${active ? 'active' : ''}`}>
            <span className="bn-icon">{it.icon}</span>
            <span className="bn-label">{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
