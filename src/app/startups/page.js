'use client';
import { useEffect, useState } from 'react';
import { fetchVentures } from '@/lib/sheets';
import VentureCard from '@/components/VentureCard';

export default function StartupsPage() {
  const [ventures, setVentures] = useState([]);
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setVentures(await fetchVentures());
      setLoading(false);
    })();
  }, []);

  const cats = ['All', ...Array.from(new Set(ventures.map(v => v.category).filter(Boolean)))];
  const filtered = ventures.filter(v => {
    if (cat !== 'All' && v.category !== cat) return false;
    if (q && !(v.name || '').toLowerCase().includes(q.toLowerCase()) &&
        !(v.pitch || '').toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  // group by category when showing All
  const grouped = cat === 'All'
    ? cats.slice(1).map(c => ({ cat: c, items: filtered.filter(v => v.category === c) }))
    : [{ cat, items: filtered }];

  return (
    <div className="section">
      <div className="container-main">
        <div className="text-center mb-6">
          <h1 className="title">Explore Startups</h1>
          <p className="subtitle">{ventures.length} ventures listed</p>
        </div>

        <input
          className="input-field mb-3"
          placeholder="Search by name or pitch..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />

        <div className="filters">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`filter-pill ${cat === c ? 'active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center" style={{ padding: '60px 0' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center" style={{ padding: '60px 0' }}>
            <p className="subtitle">No startups match your search</p>
          </div>
        ) : (
          grouped.map(group => group.items.length > 0 && (
            <div key={group.cat} className="mb-8">
              {cat === 'All' && (
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: '24px 0 16px' }}>
                  {group.cat}
                </h2>
              )}
              <div className="grid-auto">
                {group.items.map(v => <VentureCard key={v.id} venture={v} />)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
