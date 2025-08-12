const KEY = 'fake-db:press';

function readAll() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}
function writeAll(rows) {
  localStorage.setItem(KEY, JSON.stringify(rows));
}

// 최초 1회 더미 데이터(원하시면 수정/삭제하세요)
if (!localStorage.getItem(KEY)) {
  writeAll([
    {
      id: 'press_1',
      href: 'https://www.globalepic.co.kr/view.php?ud=20250609123607406848439a4874_29',
      imgSrc: 'https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?pp=002&idx=3&simg=202506091236220393448439a4874112222163195.jpg&nmt=29',
      source: '글로벌에픽',
      title: 'KS오토플랜, 청년 미래 응원 위해 아울디자인 박치은 대표 초청 특별 강연회 성료',
      date: '2025-06-09',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
}

export const pressLocalRepo = {
  async list(page, perPage) {
    const rows = readAll().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
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
    const item = { id: `press_${Date.now()}`, createdAt: now, updatedAt: now, ...payload };
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
