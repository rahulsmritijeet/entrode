'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchVenture, fetchUser, toggleFavorite } from '@/lib/sheets';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function StartupDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [venture, setVenture] = useState(null);
  const [founder, setFounder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const v = await fetchVenture(id);
      setVenture(v);
      if (v?.founderId) {
        const f = await fetchUser(v.founderId);
        setFounder(f);
      }
      setLoading(false);
    })();
  }, [id]);

  const isFav = user?.favoriteStartups?.includes(id);

  const onFav = async () => {
    if (!user) { router.push('/auth'); return; }
    await toggleFavorite(user.id, id, 'startup');
    await refreshUser();
    toast.success(isFav ? 'Removed from favorites' : 'Added to favorites');
  };

  if (loading) return <div className="section"><div className="container-main text-center">Loading...</div></div>;
  if (!venture) return <div className="section"><div className="container-main text-center">Startup not found</div></div>;

  return (
    <div className="section">
      <div className="container-main" style={{ maxWidth: 840 }}>
        <div className="card">
          <div className="tile-head">
            <span className="pill">{venture.category}</span>
            <button onClick={onFav} className={`btn ${isFav ? 'btn-primary' : 'btn-outline'}`}>
              {isFav ? '❤️ Favorited' : '🤍 Favorite'}
            </button>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, margin: '12px 0' }}>{venture.name}</h1>
          <p style={{ fontSize: 18, color: 'var(--ink2)', lineHeight: 1.6 }}>{venture.pitch}</p>

          {venture.tags?.length > 0 && (
            <div className="filters mt-4">
              {venture.tags.map(t => <span key={t} className="filter-pill">{t}</span>)}
            </div>
          )}

          <div className="divider" />

          <h3 style={{ fontWeight: 800, marginBottom: 12 }}>Founder</h3>
          {founder ? (
            <Link href={`/people/${founder.id}`} className="card-soft" style={{ display: 'block', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{founder.name}</div>
              <div style={{ color: 'var(--ink3)', fontSize: 14 }}>{founder.role}</div>
              {founder.bio && <p style={{ marginTop: 8, color: 'var(--ink2)' }}>{founder.bio}</p>}
            </Link>
          ) : (
            <p style={{ color: 'var(--ink3)' }}>Founder info unavailable</p>
          )}
        </div>
      </div>
    </div>
  );
}
