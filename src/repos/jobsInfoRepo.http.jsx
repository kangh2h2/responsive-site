const BASE = '/api';

export const jobsHttpRepo = {
  async list(page, perPage, query = {}) {
    const params = new URLSearchParams({ page, perPage, ...query });
    const res = await fetch(`${BASE}/jobs?${params.toString()}`);
    if (!res.ok) throw new Error('Failed');
    return res.json(); // { items, total }
  },
  async get(id) {
    const res = await fetch(`${BASE}/jobs/${id}`);
    if (!res.ok) return null;
    return res.json();
  },
  async create(payload) {
    const res = await fetch(`${BASE}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
  async update(id, patch) {
    const res = await fetch(`${BASE}/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
  async remove(id) {
    const res = await fetch(`${BASE}/jobs/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed');
  },
};
