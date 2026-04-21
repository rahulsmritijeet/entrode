const SCRIPT_URL = process.env.script.google.com/macros/s/AKfycbzHVJi8jk4y-KV2ZF7omqZVcF1dMUPJYUQ-yoaYwq_BUes2C6asKfuNlBpkPaNmkOKu/exec;

async function get(params) {
  const url = new URL(SCRIPT_URL);
  Object.keys(params).forEach(k => url.searchParams.append(k, params[k]));
  const res = await fetch(url.toString());
  return res.json();
}

async function post(body) {
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }
  });
  return res.json();
}

// ===== Ventures =====
export async function fetchVentures() {
  const data = await get({ action: 'getAllVentures' });
  return data.ventures || [];
}

export async function fetchFeed(userId) {
  const data = await get({ action: 'getFeed', userId: userId || '' });
  return data.ventures || [];
}

export async function fetchVenture(id) {
  const data = await get({ action: 'getVenture', id });
  return data.venture;
}

export async function createVenture(venture) {
  return post({ action: 'createVenture', venture });
}

export async function updateVenture(id, updates) {
  return post({ action: 'updateVenture', id, updates });
}

// ===== Users =====
export async function fetchUsers() {
  const data = await get({ action: 'getAllUsers' });
  return data.users || [];
}

export async function fetchUser(id) {
  const data = await get({ action: 'getUser', id });
  return data.user;
}

export async function fetchUserByEmail(email) {
  const data = await get({ action: 'getUserByEmail', email });
  return data.user;
}

export async function createUserRecord(user) {
  return post({ action: 'createUser', user });
}

export async function updateUserRecord(id, updates) {
  return post({ action: 'updateUser', id, updates });
}

export async function toggleFavorite(userId, targetId, targetType) {
  return post({ action: 'toggleFavorite', userId, targetId, targetType });
}
