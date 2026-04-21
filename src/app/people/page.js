'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchUsers } from '@/lib/sheets';

export default function PeoplePage() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('All');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await fetchUsers();
      list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      setUsers(list);
      setLoading(false);
    })();
  }, []);

  const filtered = users.filter(u => {
    if (role !== 'All' && u.role !== role && u.role !== 'Both') return false;
    if (q && !(u.name || '').toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="section">
      <div className="container-main">
        <div className="text-center mb-6">
          <h1 className="title">People</h1>
          <p className="subtitle">Discover founders and investors</p>
        </div>

        <input
          className="input-field mb-3"
          placeholder="Search by name..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />

        <div className="filters">
          {['All', 'Entrepreneur', 'Investor', 'Both'].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`filter-pill ${role === r ? 'active' : ''}`}
            >
              {r}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center" style={{ padding: '60px 0' }}>Loading...</div>
        ) : (
          <div className="grid-auto">
            {filtered.map(u => (
              <Link key={u.id} href={`/people/${u.id}`} className="tile" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="tile-head">
                  <span className="badge badge-validate">{u.role || 'Member'}</span>
                  {u.popularity > 0 && <span className="pill">⭐ {u.popularity}</span>}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{u.name}</div>
                <div style={{ color: 'var(--ink2)', fontSize: 14, minHeight: 40 }}>
                  {u.bio || 'No bio yet'}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
