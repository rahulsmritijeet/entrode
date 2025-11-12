'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { fetchVentures } from '@/lib/sheets';
import VentureCard from '@/components/VentureCard';

export default function ExplorePage() {
  const { theme } = useTheme();
  const [ventures, setVentures] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  useEffect(() => { applyFilters(); }, [ventures, cat, q]);

  const load = async () => {
    setLoading(true);
    const data = await fetchVentures();
    setVentures(data);
    setLoading(false);
  };

  const applyFilters = () => {
    let list = [...ventures];
    if (cat !== 'All') list = list.filter(v => v.category === cat);
    if (q) list = list.filter(v =>
      (v.name || '').toLowerCase().includes(q.toLowerCase()) ||
      (v.description || '').toLowerCase().includes(q.toLowerCase())
    );
    setFiltered(list);
  };

  const cats = ['All', ...Array.from(new Set(ventures.map(v => v.category).filter(Boolean)))];

  return (
    <div>
      <section className="section">
        <div className="container-main">
          <div className="text-center mb-6">
            <h1 className="title">Discover Startups</h1>
            <p className="subtitle">{ventures.length} listed</p>
          </div>

          <input
            className="input-field mb-3"
            placeholder="Search startups..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
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
            <div className="text-center" style={{ padding: '80px 0' }}>
              <div className="spinner" />
              <div className="mt-3">Loading...</div>
            </div>
          ) : (
            <div className="grid-auto">
              {filtered.map(v => (
                <VentureCard key={v.id} venture={v} />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center" style={{ padding: '80px 0' }}>
              <div className="subtitle">No startups match your search</div>
            </div>
          )}
        </div>
      </section>

      {theme === 'neon' && (
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '48px 48px', opacity: .06
        }} />
      )}
    </div>
  );
}
