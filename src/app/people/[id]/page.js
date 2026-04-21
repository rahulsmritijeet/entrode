'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchUser, fetchVentures, toggleFavorite } from '@/lib/sheets';
import { useAuth } from '@/context/AuthContext';
import VentureCard from '@/components/VentureCard';
import toast from 'react-hot-toast';

export default function PersonPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [person, setPerson] = useState(null);
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const p = await fetchUser(id);
      setPerson(p);
      const all = await fetchVentures();
      setVentures(all.filter(v => v.founderId === id));
      setLoading(false);
    })();
  }, [id]);

  const isFav = user?.favoriteUsers?.includes(id);
  const isMe = user?.id === id;

  const onFav = async () => {
    if (!user) { router.push('/auth'); return; }
    await toggleFavorite(user.id, id, 'user');
    await refreshUser();
    toast.success(isFav ? 'Removed' : 'Added to favorites');
  };

  if (loading) return <div className="section"><div className="container-main text-center">Loading...</div></div>;
  if (!person) return <div className="section"><div className="container-main text-center">User not found</div></div>;

  return (
    <div className="section">
      <div className="container-main" style={{ maxWidth: 840 }}>
        <div className="card mb-6">
          <div className="tile-head">
            <span className="badge badge-validate">{person.role}</span>
            {!isMe && (
              <button onClick={onFav} className={`btn ${isFav ? 'btn-primary' : 'btn-outline'}`}>
                {isFav ? '❤️ Favorited' : '🤍 Favorite'}
              </button>
            )}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, margin: '12px 0 4px' }}>{person.name}</h1>
          <div style={{ color: 'var(--ink3)', fontSize: 14 }}>
            {ventures.length} startups · ⭐ {person.popularity || 0} favorites
          </div>

          {person.bio && <p className="mt-4" style={{ color: 'var(--ink2)', lineHeight: 1.6 }}>{person.bio}</p>}

          <div className="divider" />

          {person.experience?.length > 0 && (
            <div className="mb-4">
              <h3 style={{ fontWeight: 800, marginBottom: 8 }}>Experience</h3>
              {person.experience.map((x, i) => (
                <div key={i} className="mb-2">
                  <b>{x.role}</b> @ {x.company} <span style={{ color: 'var(--ink3)' }}>· {x.years}</span>
                </div>
              ))}
            </div>
          )}

          {person.education?.length > 0 && (
            <div className="mb-4">
              <h3 style={{ fontWeight: 800, marginBottom: 8 }}>Education</h3>
              {person.education.map((x, i) => (
                <div key={i} className="mb-2">
                  <b>{x.degree}</b>, {x.school} <span style={{ color: 'var(--ink3)' }}>· {x.year}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 12 }}>
            {person.email && <a href={`mailto:${person.email}`} className="link">📧 {person.email}</a>}
            {person.linkedin && <a href={person.linkedin} target="_blank" rel="noreferrer" className="link">🔗 LinkedIn</a>}
            {person.instagram && <a href={`https://instagram.com/${person.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="link">📷 {person.instagram}</a>}
          </div>
        </div>

        {ventures.length > 0 && (
          <>
            <h2 className="title" style={{ textAlign: 'left', fontSize: 28 }}>Startups</h2>
            <div className="grid-auto">
              {ventures.map(v => <VentureCard key={v.id} venture={v} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
