'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    linkedin: '',
    twitter: '',
    skills: '',
    experience: '',
    education: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    } else {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || '',
        skills: user.skills || '',
        experience: user.experience || '',
        education: user.education || ''
      });
    }
  }, [user, router]);

  const handleSave = () => {
    updateUser(profile);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen theme-bg theme-text py-12">
      <div className="container-main">
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {editing ? 'Edit Profile' : profile.name}
              </h1>
              <p className="theme-text-secondary">{profile.email}</p>
            </div>
            
            {!editing && (
              <button onClick={() => setEditing(true)} className="btn btn-outline">
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block theme-text-secondary text-sm mb-2">Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={profile.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block theme-text-secondary text-sm mb-2">Location</label>
                  <input
                    type="text"
                    className="input-field"
                    value={profile.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                
                <div>
                  <label className="block theme-text-secondary text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={profile.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block theme-text-secondary text-sm mb-2">LinkedIn</label>
                  <input
                    type="url"
                    className="input-field"
                    value={profile.linkedin}
                    onChange={(e) => updateField('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div>
                <label className="block theme-text-secondary text-sm mb-2">Bio</label>
                <textarea
                  className="input-field"
                  rows="4"
                  value={profile.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block theme-text-secondary text-sm mb-2">Skills</label>
                <input
                  type="text"
                  className="input-field"
                  value={profile.skills}
                  onChange={(e) => updateField('skills', e.target.value)}
                  placeholder="e.g., Product Management, Marketing, Development"
                />
              </div>

              <div>
                <label className="block theme-text-secondary text-sm mb-2">Experience</label>
                <textarea
                  className="input-field"
                  rows="3"
                  value={profile.experience}
                  onChange={(e) => updateField('experience', e.target.value)}
                  placeholder="Your professional experience..."
                />
              </div>

              <div>
                <label className="block theme-text-secondary text-sm mb-2">Education</label>
                <input
                  type="text"
                  className="input-field"
                  value={profile.education}
                  onChange={(e) => updateField('education', e.target.value)}
                  placeholder="Your educational background"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={handleSave} className="btn btn-primary">
                  Save Changes
                </button>
                <button onClick={() => setEditing(false)} className="btn btn-outline">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {profile.bio && (
                <div>
                  <h3 className="font-semibold mb-2 theme-text-secondary">Bio</h3>
                  <p>{profile.bio}</p>
                </div>
              )}
              
              {profile.location && (
                <div>
                  <h3 className="font-semibold mb-2 theme-text-secondary">Location</h3>
                  <p>{profile.location}</p>
                </div>
              )}
              
              {profile.skills && (
                <div>
                  <h3 className="font-semibold mb-2 theme-text-secondary">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.split(',').map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full theme-bg-secondary text-sm">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.experience && (
                <div>
                  <h3 className="font-semibold mb-2 theme-text-secondary">Experience</h3>
                  <p>{profile.experience}</p>
                </div>
              )}
              
              {profile.education && (
                <div>
                  <h3 className="font-semibold mb-2 theme-text-secondary">Education</h3>
                  <p>{profile.education}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}