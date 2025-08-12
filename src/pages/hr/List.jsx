import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { jobsListRepo } from '../../repos';

export default function List() {
    const [rows, setRows] = useState([]);

    // 🔎 검색/필터 상태
    const [q, setQ] = useState('');
    const [job, setJob] = useState('');             // hr_job
    const [career, setCareer] = useState('');       // txt_1
    const [employment, setEmployment] = useState(''); // txt_2
    const [location, setLocation] = useState('');   // txt_3

    // 🔹 옵션 상태(마스터/전체 기준으로 유지)
    const [jobOpts, setJobOpts] = useState([]);
    const [careerOpts, setCareerOpts] = useState([]);
    const [employmentOpts, setEmploymentOpts] = useState([]);
    const [locationOpts, setLocationOpts] = useState([]);

    // 옵션 로드
    useEffect(() => {
        let alive = true;
        (async () => {
        try {
            const { jobs = [], careers = [], employments = [], locations = [] } =
            (await jobsListRepo.listFilters()) || {};
            if (!alive) return;
            setJobOpts(jobs);
            setCareerOpts(careers);
            setEmploymentOpts(employments);
            setLocationOpts(locations);
        } catch {
            setJobOpts([]); setCareerOpts([]); setEmploymentOpts([]); setLocationOpts([]);
        }
        })();
        return () => { alive = false; };
    }, []);

    // 서버에 전달할 쿼리
    const query = useMemo(() => ({ q, job, career, employment, location }), [q, job, career, employment, location]);

    // 공고 로드(검색/필터 적용)
    useEffect(() => {
        let alive = true;
        (async () => {
            const { items } = await jobsListRepo.list(1, 9999, query);
            if (!alive) return;
            setRows(items || []);
        })();
        return () => { alive = false; };
    }, [query]);

    // 마감 판정
    const dDay = (periodText) => {
        if (!periodText || periodText === '상시채용') return '상시채용';
        const parts = periodText.split('~').map(s => s.trim());
        const endStr = parts[1] || '';
        if (!endStr) return '상시채용';
        const end = new Date(endStr.replaceAll('.', '-'));
        if (isNaN(end.getTime())) return '상시채용';
        const today = new Date();
        end.setHours(0,0,0,0); today.setHours(0,0,0,0);
        const diff = Math.ceil((end - today) / (1000*60*60*24));
        if (diff < 0) return '채용마감';
        if (diff === 0) return 'D-day';
        return `D-${diff}`;
    };

    // ✅ 리스트에만 마감 제외
    const visibleRows = rows.filter(item => dDay(item.txt_4) !== '채용마감');

    return (
        <div className="hr">
            <section className="list-content lc-01">
                <div className="inner">
                    <h3>채용절차</h3>
                    <div>진행 중인 채용 포지션을 확인하시고 언제든지 편하게 지원해주세요.</div>
                    <ol className="flex-center ani-up">
                        <li className="ani-scale">서류전형</li>
                        <li className="ani-scale">1차 면접</li>
                        <li className="ani-scale">임원 면접</li>
                        <li className="ani-scale">연봉 및 처우 협의</li>
                        <li className="ani-scale">채용 확정</li>
                    </ol>
                </div>
            </section>

            <section className="list-content lc-02">
                <div className="inner">
                    <h2>모집 중인 포지션 ({visibleRows.length})</h2>

                    {/* 검색/필터 */}
                    <div className="search-bar flex-center">
                        <input
                        type="text"
                        placeholder="관심있는 공고를 찾아보세요"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') setQ(e.currentTarget.value); }}
                        />
                        <button onClick={() => setQ(q)}>
                        <img className="img-responsive" src="/images/ico_search.svg" alt="검색" />
                        </button>
                    </div>

                    <div className="filter-options flex-center">
                        <select value={job} onChange={(e)=>setJob(e.target.value)}>
                        <option value="">직군 선택</option>
                        {jobOpts.map((o) =>
                            typeof o === 'object'
                            ? <option key={o.code} value={o.code}>{o.name}</option>
                            : <option key={o} value={o}>{o}</option>
                        )}
                        </select>

                        <select value={career} onChange={(e)=>setCareer(e.target.value)}>
                        <option value="">경력사항</option>
                        {careerOpts.map((o) =>
                            typeof o === 'object'
                            ? <option key={o.code} value={o.code}>{o.name}</option>
                            : <option key={o} value={o}>{o}</option>
                        )}
                        </select>

                        <select value={employment} onChange={(e)=>setEmployment(e.target.value)}>
                        <option value="">고용형태</option>
                        {employmentOpts.map((o) =>
                            typeof o === 'object'
                            ? <option key={o.code} value={o.code}>{o.name}</option>
                            : <option key={o} value={o}>{o}</option>
                        )}
                        </select>

                        <select value={location} onChange={(e)=>setLocation(e.target.value)}>
                        <option value="">근무지</option>
                        {locationOpts.map((o) =>
                            typeof o === 'object'
                            ? <option key={o.code} value={o.code}>{o.name}</option>
                            : <option key={o} value={o}>{o}</option>
                        )}
                        </select>
                    </div>

                    <div className="hr-list-wrap">
                        {visibleRows.length === 0 && (
                        <div className="empty">조건에 맞는 채용공고가 없습니다.</div>
                        )}

                        {visibleRows.map(({ id, hr_job, hr_tit, txt_1, txt_2, txt_3, txt_4 }) => (
                        <Link to={`/hr/detail/${id}`} className="hr-list-box" key={id}>
                            <div className="hr-info">
                            <h4>{hr_job ? `[${hr_job}] ` : ''}{hr_tit}</h4>
                            <div className="flex-center">
                                <span>{txt_1}</span><span className="bar"></span>
                                <span>{txt_2}</span><span className="bar"></span>
                                <span>{txt_3}</span><span className="bar"></span>
                                <span className="fc-s">{txt_4}</span>
                            </div>
                            </div>
                            <div className="dday">{dDay(txt_4)}</div>
                        </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
