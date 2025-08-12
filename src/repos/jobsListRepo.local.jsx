const KEY = 'fake-db:jobs-simple';

function readAll() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
}
function writeAll(rows) {
    localStorage.setItem(KEY, JSON.stringify(rows));
}

// 최초 더미 데이터 (id 고유, 날짜 유효)
if (!localStorage.getItem(KEY)) {
    writeAll([
        {
            id: 1,
            hr_job: "영업직",
            hr_tit: "인바운드 신차 영업 / 계약 DB 제공",
            txt_1: "경력무관",
            txt_2: "정규직",
            txt_3: "본점",
            txt_4: "상시채용",
            summary: "고객 상담 및 신차 계약을 진행하는 영업직입니다.",
            duties: [
                "고객 상담 및 차량 판매",
                "계약서 작성 및 고객관리",
                "매출 목표 달성"
            ],
            requirements: [
                "학력 무관",
                "영업 경험자 우대",
                "운전면허 소지자"
            ],
            preferences: [
                "자동차 영업 경험",
                "고객 서비스 마인드 보유자"
            ],
            working: [
                "근무지: 인천 본점",
                "근무시간: 주 5일(월~금) 09:00~18:00"
            ]
        },
        {
            id: 2,
            hr_job: "기술직",
            hr_tit: "프론트엔드 개발자 채용",
            txt_1: "경력",
            txt_2: "정규직",
            txt_3: "2지점",
            txt_4: "2025.07.01 ~ 2025.09.30",
            summary: "React 기반 웹 서비스를 개발하고 유지보수할 프론트엔드 개발자를 모집합니다.",
            duties: [
                "웹 기반 신규 서비스 프론트엔드 개발",
                "UI/UX 개선 및 성능 최적화",
                "백엔드 API 연동"
            ],
            requirements: [
                "React 실무 경험 1년 이상",
                "JavaScript/HTML/CSS 숙련",
                "REST API 사용 경험"
            ],
            preferences: [
                "TypeScript 경험자",
                "Next.js 경험자",
                "상용 서비스 운영 경험"
            ],
            working: [
                "근무지: 인천 송도 2지점",
                "근무시간: 주 5일(월~금) 09:00~18:00"
            ]
        },
        {
            id: 3,
            hr_job: "관리직",
            hr_tit: "재무, 세무, 회계 담당자 채용",
            txt_1: "경력",
            txt_2: "정규직",
            txt_3: "3지점",
            txt_4: "2025.06.01 ~ 2025.10.31",
        },
        {
            id: 4,
            hr_job: "마케팅",
            hr_tit: "광고 디자이너 채용",
            txt_1: "경력",
            txt_2: "정규직",
            txt_3: "3지점",
            txt_4: "2025.06.01 ~ 2025.08.31",
        },
    ]);
}

// 검색/필터 적용
function applyFilters(rows, query = {}) {
    const { q, job, career, employment, location } = query;
    let out = [...rows];

    if (q && q.trim()) {
        const needle = q.trim().toLowerCase();
        out = out.filter(r => (r.hr_tit || '').toLowerCase().includes(needle));
    }
    if (job) out = out.filter(r => (r.hr_job || '') === job);
    if (career) out = out.filter(r => (r.txt_1 || '') === career);
    if (employment) out = out.filter(r => (r.txt_2 || '') === employment);
    if (location) out = out.filter(r => (r.txt_3 || '') === location);

    return out;
}

export const jobsListLocalRepo = {
    async list(page = 1, perPage = 9999, query = {}) {
        const all = readAll();
        const filtered = applyFilters(all, query);
        const total = filtered.length;
        const start = (page - 1) * perPage;
        const items = filtered.slice(start, start + perPage);
        return { items, total };
    },

    async get(id) {
        return readAll().find(r => String(r.id) === String(id)) || null;
    },

    async create(payload) {
        const rows = readAll();
        const newId = rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1;
        const item = { id: newId, ...payload };
        rows.push(item);
        writeAll(rows);
        return item;
    },

    async update(id, patch) {
        const rows = readAll();
        const idx = rows.findIndex(r => String(r.id) === String(id));
        if (idx < 0) throw new Error('Not found');
        rows[idx] = { ...rows[idx], ...patch };
        writeAll(rows);
        return rows[idx];
    },

    async remove(id) {
        writeAll(readAll().filter(r => String(r.id) !== String(id)));
    },

    // 🔹 마스터(전체) 기준 옵션 제공 — 마감과 무관하게 유지
    async listFilters() {
        const rows = readAll();
        const uniq = (arr) => Array.from(new Set(arr.filter(Boolean))).sort();
        return {
            jobs: uniq(rows.map(r => r.hr_job)),
            careers: uniq(rows.map(r => r.txt_1)),
            employments: uniq(rows.map(r => r.txt_2)),
            locations: uniq(rows.map(r => r.txt_3)),
        };
    },
};
