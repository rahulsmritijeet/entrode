'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { toggleFavorite } from '@/lib/sheets';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function VentureCard({ venture }) {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const isFav = user?.favoriteStartups?.includes(venture.id);

  const onFav = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { router.push('/auth'); return; }
    await toggleFavorite(user.id, venture.id, 'startup');
    await refreshUser();
    toast.success(isFav ? 'Removed' : 'Added to favorites');
  };

  return (
    <Link href={`/startups/${venture.id}`} className="tile" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="tile-head">
        <span className="pill">{venture.category || 'Other'}</span>
        <button onClick={onFav} className="btn btn-outline" style={{ padding: '6px 10px' }}>
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="mb-2" style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-.01em' }}>
        {venture.name}
      </div>
      <div className="mb-3" style={{ color: 'var(--ink2)', fontSize: 14, lineHeight: 1.5 }}>
        {venture.pitch}
      </div>
      {venture.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {venture.tags.slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 12, color: 'var(--ink3)' }}>#{t}</span>
          ))}
        </div>
      )}
    </Link>
  );
}
