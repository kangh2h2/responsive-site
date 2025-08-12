const BASE = '/api';

export const prHttpRepo = {
  async list(page, perPage) {
    const res = await fetch(`${BASE}/pr?page=${page}&perPage=${perPage}`);
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
  async get(id) {
    const res = await fetch(`${BASE}/pr/${id}`);
    if (!res.ok) return null;
    return res.json();
  },
  async create(payload) {
    const res = await fetch(`${BASE}/pr`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
  async update(id, patch) {
    const res = await fetch(`${BASE}/pr/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
  async remove(id) {
    const res = await fetch(`${BASE}/pr/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed');
  },
};
