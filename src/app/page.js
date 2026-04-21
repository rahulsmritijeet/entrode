'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { fetchFeed } from '@/lib/sheets';
import VentureCard from '@/components/VentureCard';

export default function HomePage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchFeed(user?.id);
      setVentures(data);
      setLoading(false);
    })();
  }, [user?.id]);

  return (
    <div className="theme-bg theme-text">
      <section className="hero-compact">
        <div className="container-main">
          <h1 className={`title-hero ${theme === 'neon' ? 'neon-text' : 'gradient-text'}`}>
            ENTRODE
          </h1>
          <p className="subtitle mt-3">
            {user ? `Welcome back, ${user.name}` : 'Build. Launch. Fund.'}
          </p>
          {!user && (
            <div className="hero-actions">
              <Link href="/auth" className="btn btn-primary btn-lg">Get Started</Link>
              <Link href="/startups" className="btn btn-outline btn-lg">Browse Startups</Link>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-main">
          <h2 className="title">{user ? 'For You' : 'Trending Startups'}</h2>
          <p className="subtitle mb-6">
            {user ? 'Recommended based on what you love' : 'Popular ventures right now'}
          </p>

          {loading ? (
            <div className="text-center" style={{ padding: '60px 0' }}>Loading...</div>
          ) : ventures.length === 0 ? (
            <div className="text-center" style={{ padding: '60px 0' }}>
              <p className="subtitle">No startups yet. Be the first!</p>
              {user && <Link href="/create" className="btn btn-primary mt-4">Launch Startup</Link>}
            </div>
          ) : (
            <div className="grid-auto">
              {ventures.slice(0, 12).map(v => <VentureCard key={v.id} venture={v} />)}
            </div>
          )}
        </div>
      </section>

      {theme === 'neon' && (
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, magenta 1px, transparent 1px)',
          backgroundSize: '56px 56px', opacity: .04
        }} />
      )}
    </div>
  );
}
