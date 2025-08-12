// src/repos/prRepo.local.js
const KEY = 'fake-db:pr';

function readAll() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

function writeAll(rows) {
  localStorage.setItem(KEY, JSON.stringify(rows));
}

// 초기 더미 데이터 한 번만 넣기
if (!localStorage.getItem(KEY)) {
  writeAll([
    {
      id: 'pr_1',
      title: 'KS오토플랜 송도 2지점 개업식 스케치',
      date: '2024-05-10',
      youtubeId: 'en5yw8FTRxw',
      externalUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]);
}

export const prLocalRepo = {
  async list(page, perPage) {
    const rows = readAll().sort((a,b) => (b.date || '').localeCompare(a.date || ''));
    const total = rows.length;
    const start = (page - 1) * perPage;
    const items = rows.slice(start, start + perPage);
    return { items, total };
  },
  async get(id) {
    return readAll().find(r => r.id === id) || null;
  },
  async create(payload) {
    const now = new Date().toISOString();
    const item = {
      id: `pr_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      ...payload,
    };
    const rows = readAll();
    rows.push(item);
    writeAll(rows);
    return item;
  },
  async update(id, patch) {
    const rows = readAll();
    const idx = rows.findIndex(r => r.id === id);
    if (idx < 0) throw new Error('Not found');
    rows[idx] = { ...rows[idx], ...patch, updatedAt: new Date().toISOString() };
    writeAll(rows);
    return rows[idx];
  },
  async remove(id) {
    writeAll(readAll().filter(r => r.id !== id));
  },
};
