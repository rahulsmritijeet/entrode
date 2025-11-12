'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        toast.error('Please fill all fields');
        return;
      }
      
      const userData = {
        id: `user_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString()
      };
      
      login(userData);
      toast.success('Account created successfully!');
      router.push('/profile');
    } else {
      if (!formData.email || !formData.password) {
        toast.error('Please enter email and password');
        return;
      }
      
      const userData = {
        id: `user_${Date.now()}`,
        email: formData.email,
        name: formData.email.split('@')[0],
        createdAt: new Date().toISOString()
      };
      
      login(userData);
      toast.success('Logged in successfully!');
      router.push('/profile');
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen theme-bg theme-text flex items-center justify-center py-12">
      <div className="card" style={{ width: '100%', maxWidth: '440px', margin: '0 24px' }}>
        <h2 className="text-3xl font-bold mb-8 text-center">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block theme-text-secondary text-sm mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block theme-text-secondary text-sm mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </>
          )}

          <div>
            <label className="block theme-text-secondary text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="input-field"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block theme-text-secondary text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              className="input-field"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }}>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="theme-text-secondary">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="theme-accent ml-2 font-semibold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}