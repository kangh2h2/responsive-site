const BASE = '/api';

export const jobsListHttpRepo = {
    async list(page, perPage, query = {}) {
        const params = new URLSearchParams({ page, perPage, ...query });
        const res = await fetch(`${BASE}/jobs?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch job list');
        return res.json(); // { items, total }
    },

    async get(id) {
        const res = await fetch(`${BASE}/jobs/${encodeURIComponent(id)}`);
        if (!res.ok) return null;
        return res.json();
    },

    async create(payload) {
        const res = await fetch(`${BASE}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create job');
        return res.json();
    },

    async update(id, patch) {
        const res = await fetch(`${BASE}/jobs/${encodeURIComponent(id)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patch),
        });
        if (!res.ok) throw new Error('Failed to update job');
        return res.json();
    },

    async remove(id) {
        const res = await fetch(`${BASE}/jobs/${encodeURIComponent(id)}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete job');
    },

    // 🔹 옵션: 서버가 마스터(전체) 기준으로 반환
    async listFilters() {
        const res = await fetch(`${BASE}/jobs/filters`);
        if (!res.ok) throw new Error('Failed to fetch filters');
        return res.json(); // { jobs:[], careers:[], employments:[], locations:[] }
    },
};
