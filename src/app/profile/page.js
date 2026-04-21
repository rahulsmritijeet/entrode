'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchVentures, fetchUsers } from '@/lib/sheets';
import VentureCard from '@/components/VentureCard';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser, loading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState('info'); // info | startups | people
  const [form, setForm] = useState(null);
  const [favStartups, setFavStartups] = useState([]);
  const [favUsers, setFavUsers] = useState([]);
  const [myVentures, setMyVentures] = useState([]);

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'Entrepreneur',
      bio: user.bio || '',
      linkedin: user.linkedin || '',
      instagram: user.instagram || '',
      experience: user.experience?.length ? user.experience : [{ role: '', company: '', years: '' }],
      education: user.education?.length ? user.education : [{ school: '', degree: '', year: '' }]
    });

    (async () => {
      const [vs, us] = await Promise.all([fetchVentures(), fetchUsers()]);
      setFavStartups(vs.filter(v => user.favoriteStartups?.includes(v.id)));
      setFavUsers(us.filter(u => user.favoriteUsers?.includes(u.id)));
      setMyVentures(vs.filter(v => v.founderId === user.id));
    })();
  }, [user]);

  if (!user || !form) return null;

  const save = async () => {
    const cleaned = {
      ...form,
      experience: form.experience.filter(x => x.role || x.company),
      education: form.education.filter(x => x.school || x.degree)
    };
    await updateUser(cleaned);
    setEditing(false);
    toast.success('Profile updated');
  };

  const updateExp = (i, key, val) => {
    const arr = [...form.experience];
    arr[i] = { ...arr[i], [key]: val };
    setForm({ ...form, experience: arr });
  };
  const addExp = () => setForm({ ...form, experience: [...form.experience, { role: '', company: '', years: '' }] });
  const rmExp = (i) => setForm({ ...form, experience: form.experience.filter((_, j) => j !== i) });

  const updateEdu = (i, key, val) => {
    const arr = [...form.education];
    arr[i] = { ...arr[i], [key]: val };
    setForm({ ...form, education: arr });
  };
  const addEdu = () => setForm({ ...form, education: [...form.education, { school: '', degree: '', year: '' }] });
  const rmEdu = (i) => setForm({ ...form, education: form.education.filter((_, j) => j !== i) });

  const invested = user.role === 'Investor' || user.role === 'Both' ? (user.favoriteStartups?.length || 0) : 0;

  return (
    <div className="section">
      <div className="container-main" style={{ maxWidth: 840 }}>
        <div className="card mb-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 30, fontWeight: 900 }}>{user.name}</h1>
              <div style={{ color: 'var(--ink3)', fontSize: 14 }}>{user.email}</div>
              <div style={{ marginTop: 6 }}>
                <span className="badge badge-validate">{user.role}</span>
              </div>
            </div>
            {!editing && <button onClick={() => setEditing(true)} className="btn btn-outline">Edit</button>}
          </div>

          <div style={{ display: 'flex', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
            <div><b>{myVentures.length}</b> <span style={{ color: 'var(--ink3)' }}>startups founded</span></div>
            <div><b>{invested}</b> <span style={{ color: 'var(--ink3)' }}>interested in</span></div>
            <div><b>{user.popularity || 0}</b> <span style={{ color: 'var(--ink3)' }}>followers</span></div>
          </div>
        </div>

        <div className="filters">
          {['info', 'startups', 'people'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`filter-pill ${tab === t ? 'active' : ''}`}
            >
              {t === 'info' ? 'Profile' : t === 'startups' ? `Favorite Startups (${favStartups.length})` : `Favorite People (${favUsers.length})`}
            </button>
          ))}
        </div>

        {tab === 'info' && (
          <div className="card">
            {editing ? (
              <div>
                <div className="grid md:grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Name"><input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Field>
                  <Field label="Role">
                    <select className="input-field" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                      <option>Entrepreneur</option>
                      <option>Investor</option>
                      <option>Both</option>
                    </select>
                  </Field>
                  <Field label="LinkedIn URL"><input className="input-field" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." /></Field>
                  <Field label="Instagram"><input className="input-field" value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="@handle" /></Field>
                </div>

                <Field label="Bio"><textarea className="input-field" rows="3" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} /></Field>

                <h3 style={{ fontWeight: 800, marginTop: 20, marginBottom: 10 }}>Experience</h3>
                {form.experience.map((x, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px auto', gap: 8, marginBottom: 8 }}>
                    <input className="input-field" placeholder="Role" value={x.role} onChange={e => updateExp(i, 'role', e.target.value)} />
                    <input className="input-field" placeholder="Company" value={x.company} onChange={e => updateExp(i, 'company', e.target.value)} />
                    <input className="input-field" placeholder="Years" value={x.years} onChange={e => updateExp(i, 'years', e.target.value)} />
                    <button type="button" onClick={() => rmExp(i)} className="btn btn-outline">✕</button>
                  </div>
                ))}
                <button type="button" onClick={addExp} className="btn btn-outline">+ Add Experience</button>

                <h3 style={{ fontWeight: 800, marginTop: 20, marginBottom: 10 }}>Education</h3>
                {form.education.map((x, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px auto', gap: 8, marginBottom: 8 }}>
                    <input className="input-field" placeholder="School" value={x.school} onChange={e => updateEdu(i, 'school', e.target.value)} />
                    <input className="input-field" placeholder="Degree" value={x.degree} onChange={e => updateEdu(i, 'degree', e.target.value)} />
                    <input className="input-field" placeholder="Year" value={x.year} onChange={e => updateEdu(i, 'year', e.target.value)} />
                    <button type="button" onClick={() => rmEdu(i)} className="btn btn-outline">✕</button>
                  </div>
                ))}
                <button type="button" onClick={addEdu} className="btn btn-outline">+ Add Education</button>

                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button onClick={save} className="btn btn-primary">Save</button>
                  <button onClick={() => setEditing(false)} className="btn btn-outline">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                {user.bio && <p style={{ color: 'var(--ink2)', marginBottom: 16 }}>{user.bio}</p>}

                {user.experience?.length > 0 && (
                  <div className="mb-4">
                    <h3 style={{ fontWeight: 800, marginBottom: 8 }}>Experience</h3>
                    {user.experience.map((x, i) => (
                      <div key={i} className="mb-2">
                        <b>{x.role}</b> @ {x.company} <span style={{ color: 'var(--ink3)' }}>· {x.years}</span>
                      </div>
                    ))}
                  </div>
                )}

                {user.education?.length > 0 && (
                  <div className="mb-4">
                    <h3 style={{ fontWeight: 800, marginBottom: 8 }}>Education</h3>
                    {user.education.map((x, i) => (
                      <div key={i} className="mb-2">
                        <b>{x.degree}</b>, {x.school} <span style={{ color: 'var(--ink3)' }}>· {x.year}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 10 }}>
                  {user.email && <a href={`mailto:${user.email}`} className="link">📧 {user.email}</a>}
                  {user.linkedin && <a href={user.linkedin} target="_blank" rel="noreferrer" className="link">🔗 LinkedIn</a>}
                  {user.instagram && <a href={`https://instagram.com/${user.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="link">📷 {user.instagram}</a>}
                </div>

                <div className="divider" />
                <Link href="/create" className="btn btn-primary">+ Launch a Startup</Link>
              </div>
            )}
          </div>
        )}

        {tab === 'startups' && (
          favStartups.length === 0
            ? <div className="text-center" style={{ padding: 40 }}><p className="subtitle">No favorites yet</p></div>
            : <div className="grid-auto">{favStartups.map(v => <VentureCard key={v.id} venture={v} />)}</div>
        )}

        {tab === 'people' && (
          favUsers.length === 0
            ? <div className="text-center" style={{ padding: 40 }}><p className="subtitle">No favorites yet</p></div>
            : (
              <div className="grid-auto">
                {favUsers.map(u => (
                  <Link key={u.id} href={`/people/${u.id}`} className="tile" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div className="tile-head">
                      <span className="badge badge-validate">{u.role}</span>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{u.name}</div>
                    <div style={{ color: 'var(--ink2)', fontSize: 14 }}>{u.bio || 'No bio'}</div>
                  </Link>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label className="block theme-text-secondary text-sm mb-2">{label}</label>
      {children}
    </div>
  );
}
