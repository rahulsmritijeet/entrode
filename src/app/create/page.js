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

const stages = ['Ideation', 'Validation', 'Growth', 'Scale'];

const fundingOptions = [
  'Not Seeking', 'Under ₹10L', '₹10L - ₹50L', '₹50L - ₹1Cr', 
  '₹1Cr - ₹5Cr', '₹5Cr - ₹10Cr', 'Above ₹10Cr'
];

export default function CreatePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'FinTech',
    stage: 'Ideation',
    description: '',
    fundingTarget: 'Not Seeking',
    website: '',
    pitch: '',
    teamSize: '',
    location: '',
    problem: '',
    solution: '',
    marketSize: '',
    competitors: '',
    revenue: '',
    achievements: ''
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to create a startup');
      router.push('/auth');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      toast.error('Please fill required fields');
      return;
    }

    setLoading(true);
    try {
      const ventureData = {
        ...formData,
        founder: user.name,
        founderEmail: user.email,
        id: `venture_${Date.now()}`,
        createdAt: new Date().toISOString(),
        pulse: 0,
        investors: []
      };

      await createVenture(ventureData);
      toast.success('Startup created successfully!');
      router.push('/explore');
    } catch (error) {
      toast.error('Failed to create startup');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen theme-bg theme-text py-12">
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Launch Your Startup
          </h1>
          <p className="theme-text-secondary">
            Share your vision with potential investors and partners
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block theme-text-secondary text-sm mb-2">
                Startup Name *
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Enter your startup name"
                required
              />
            </div>

            <div>
              <label className="block theme-text-secondary text-sm mb-2">
                Category *
              </label>
              <select
                className="input-field"
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block theme-text-secondary text-sm mb-2">
                Current Stage *
              </label>
              <select
                className="input-field"
                value={formData.stage}
                onChange={(e) => updateField('stage', e.target.value)}
              >
                {stages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block theme-text-secondary text-sm mb-2">
                Brief Description *
              </label>
              <textarea
                className="input-field"
                rows="3"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="What does your startup do? (2-3 sentences)"
                required
              />
            </div>

            <div>
              <label className="block theme-text-secondary text-sm mb-2">
                Funding Requirement
              </label>
              <select
                className="input-field"
                value={formData.fundingTarget}
                onChange={(e) => updateField('fundingTarget', e.target.value)}
              >
                {fundingOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block theme-text-secondary text-sm mb-2">
                Team Size
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.teamSize}
                onChange={(e) => updateField('teamSize', e.target.value)}
                placeholder="e.g., 5-10 members"
              />
            </div>

            <div>
              <label className="block theme-text-secondary text-sm mb-2">
                Location
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="block theme-text-secondary text-sm mb-2">
                Website
              </label>
              <input
                type="url"
                className="input-field"
                value={formData.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block theme-text-secondary text-sm mb-2">
                Problem Statement
              </label>
              <textarea
                className="input-field"
                rows="3"
                value={formData.problem}
                onChange={(e) => updateField('problem', e.target.value)}
                placeholder="What problem are you solving?"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block theme-text-secondary text-sm mb-2">
                Your Solution
              </label>
              <textarea
                className="input-field"
                rows="3"
                value={formData.solution}
                onChange={(e) => updateField('solution', e.target.value)}
                placeholder="How are you solving this problem?"
              />
            </div>

            <div>
              <label className="block theme-text-secondary text-sm mb-2">
                Market Size
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.marketSize}
                onChange={(e) => updateField('marketSize', e.target.value)}
                placeholder="e.g., ₹1000 Cr TAM"
              />
            </div>

            <div>
              <label className="block theme-text-secondary text-sm mb-2">
                Monthly Revenue
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.revenue}
                onChange={(e) => updateField('revenue', e.target.value)}
                placeholder="e.g., ₹5 Lakhs MRR"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block theme-text-secondary text-sm mb-2">
                Key Achievements
              </label>
              <textarea
                className="input-field"
                rows="2"
                value={formData.achievements}
                onChange={(e) => updateField('achievements', e.target.value)}
                placeholder="Awards, recognitions, milestones..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block theme-text-secondary text-sm mb-2">
                Elevator Pitch
              </label>
              <textarea
                className="input-field"
                rows="4"
                value={formData.pitch}
                onChange={(e) => updateField('pitch', e.target.value)}
                placeholder="Your 60-second pitch to investors..."
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '32px' }}
          >
            {loading ? 'Creating...' : 'Launch Startup'}
          </button>
        </form>
      </div>
    </div>
  );
}