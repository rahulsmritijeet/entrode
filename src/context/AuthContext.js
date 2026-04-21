'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserByEmail, createUserRecord, updateUserRecord } from '@/lib/sheets';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('entrode_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const persist = (u) => {
    setUser(u);
    if (u) localStorage.setItem('entrode_user', JSON.stringify(u));
    else localStorage.removeItem('entrode_user');
  };

  const login = async ({ email, name }) => {
    let u = await fetchUserByEmail(email);
    if (!u) {
      const res = await createUserRecord({
        email,
        name: name || email.split('@')[0],
        role: 'Entrepreneur',
        bio: '',
        linkedin: '',
        instagram: '',
        experience: [],
        education: [],
        favoriteStartups: [],
        favoriteUsers: []
      });
      u = res.user;
    }
    persist(u);
    return u;
  };

  const logout = () => persist(null);

  const updateUser = async (updates) => {
    if (!user) return;
    await updateUserRecord(user.id, updates);
    persist({ ...user, ...updates });
  };

  const refreshUser = async () => {
    if (!user) return;
    const fresh = await fetchUserByEmail(user.email);
    if (fresh) persist(fresh);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
