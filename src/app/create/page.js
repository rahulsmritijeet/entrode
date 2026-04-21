'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createVenture } from '@/lib/sheets';
import toast from 'react-hot-toast';

const categories = [
  'FinTech', 'EdTech', 'HealthTech', 'AgriTech', 'E-Commerce',
  'SaaS', 'AI/ML', 'Blockchain', 'IoT', 'CleanTech',
  'FoodTech', 'TravelTech', 'LogisticsTech', 'RetailTech', 'Other'
];

export default function CreatePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'FinTech',
    pitch: '',
    tags: ''
  });

  useEffect(() => {
    if (!user) router.push('/auth');
  }, [user, router]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.pitch) {
      toast.error('Name and pitch are required');
      return;
    }
    if (form.pitch.length > 400) {
      toast.error('Keep pitch under 400 characters');
      return;
    }
    setLoading(true);
    try {
      await createVenture({
        name: form.name,
        category: form.category,
        pitch: form.pitch,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        founderId: user.id
      });
      toast.success('Startup launched!');
      router.push('/startups');
    } catch {
      toast.error('Failed to create');
    } finally { setLoading(false); }
  };

  if (!user) return null;

  return (
    <div className="section">
      <div className="container-main" style={{ maxWidth: 720 }}>
        <h1 className="title">Launch Your Startup</h1>
        <p className="subtitle mb-6">Keep it short, honest, and compelling.</p>

        <form onSubmit={submit} className="card">
          <div className="mb-4">
            <label className="block theme-text-secondary text-sm mb-2">Startup Name *</label>
            <input
              className="input-field"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., SwiftPay"
            />
          </div>

          <div className="mb-4">
            <label className="block theme-text-secondary text-sm mb-2">Category *</label>
            <select
              className="input-field"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block theme-text-secondary text-sm mb-2">
              Short Pitch * <span style={{ color: 'var(--ink3)' }}>({form.pitch.length}/400)</span>
            </label>
            <textarea
              className="input-field"
              rows="5"
              maxLength={400}
              value={form.pitch}
              onChange={e => setForm({ ...form, pitch: e.target.value })}
              placeholder="What you do, who it's for, why it matters. Keep it crisp."
            />
          </div>

          <div className="mb-4">
            <label className="block theme-text-secondary text-sm mb-2">Tags (comma separated)</label>
            <input
              className="input-field"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              placeholder="B2B, mobile, india"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? 'Launching...' : 'Launch Startup'}
          </button>
        </form>
      </div>
    </div>
  );
}
