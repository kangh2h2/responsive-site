import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import PolicyPopup from '../../components/PolicyPopup';
import { jobsListRepo } from '../../repos';

export default function Detail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formOpen, setFormOpen] = useState(false);
    const [formClosing, setFormClosing] = useState(false);
    const [completeOpen, setCompleteOpen] = useState(false);
    const [completeClosing, setCompleteClosing] = useState(false);
    const [policyOpen, setPolicyOpen] = useState(false);

    const resumeInputRef = useRef(null);
    const portfolioInputRef = useRef(null);

    const [resumeName, setResumeName] = useState("파일첨부 (50MB 이하 PDF)");
    const [portfolioName, setPortfolioName] = useState("파일첨부 (50MB 이하 PDF)");
    const placeholder = "파일첨부 (50MB 이하 PDF)";

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const data = await jobsListRepo.get(id);
                if (!alive) return;
                setJob(data);
            } finally {
                setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [id]);

    const dDay = (periodText) => {
        if (!periodText) return '상시채용';
        const parts = periodText.split('~').map(s => s.trim());
        const endStr = parts[1] || '';
        if (!endStr) return '상시채용';
        const norm = endStr.replaceAll('.', '-');
        const end = new Date(norm);
        if (isNaN(end.getTime())) return '상시채용';
        const today = new Date();
        end.setHours(0, 0, 0, 0); today.setHours(0, 0, 0, 0);
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        if (diff < 0) return '채용마감';
        if (diff === 0) return 'D-day';
        return `D-${diff}`;
    };

    const closeForm = (callback) => {
        setFormClosing(true);
        setTimeout(() => {
            setFormOpen(false);
            setFormClosing(false);
            if (callback) callback();
        }, 300);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        closeForm(() => setCompleteOpen(true));
    };

    const closeComplete = () => {
        setCompleteClosing(true);
        setTimeout(() => {
            setCompleteOpen(false);
            setCompleteClosing(false);
        }, 300);
    };

    const handleResumeChange = (e) => {
        if (e.target.files.length > 0) {
            setResumeName(e.target.files[0].name);
        } else {
            setResumeName(placeholder);
        }
    };

    const handlePortfolioChange = (e) => {
        if (e.target.files.length > 0) {
            setPortfolioName(e.target.files[0].name);
        } else {
            setPortfolioName(placeholder);
        }
    };

    const toArray = (v) => {
        if (Array.isArray(v)) return v.filter(Boolean);
        if (typeof v === 'string') {
            return v
                .split(/\r?\n/)     // 줄바꿈으로 분리해도 됨(백오피스가 텍스트박스일 때)
                .map(s => s.trim())
                .filter(Boolean);
        }
        return [];
    };

    const isAnyPopupOpen = formOpen || completeOpen || policyOpen;

    useEffect(() => {
        document.body.style.overflow = isAnyPopupOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isAnyPopupOpen]);

    if (loading) return <div className="inner">로딩중...</div>;
    if (!job) return <div className="inner">해당 공고를 찾을 수 없습니다.</div>;

    return (
        <div className="hr-detail">
            <section className="detail-content">
                <div className="inner">
                    <h2>채용 상세보기</h2>
                    <div className="detail-txt">
                        본 페이지는 채용 공고의 세부 내용을 안내합니다. 아래 버튼을 클릭하여 지원서를 제출해 주세요.
                    </div>

                    <div className="hr-info">
                        <p className="dday">{dDay(job.txt_4)}</p>
                        <h3>[{job.hr_job}] {job.hr_tit}</h3>
                        <div className="flex-center">
                            <span>{job.txt_1}</span>
                            <span className="bar"></span>
                            <span>{job.txt_2}</span>
                            <span className="bar"></span>
                            <span>{job.txt_3}</span>
                            <span className="bar"></span>
                            <span className="fc-s">{job.txt_4}</span>
                        </div>
                    </div>

                    {/* 🔹 섹션 제목(dt)은 고정, dd li는 관리자 데이터로 동적 */}
                    <div className="detail-info">
                        {/* 직무 소개(요약문이 있으면 p로 노출, 없으면 숨김) */}
                        {job.summary && (
                            <>
                                <h4 className="flex-center"><span></span>직무 소개</h4>
                                <p>{job.summary}</p>
                            </>
                        )}

                        {/* 주요 업무 */}
                        {toArray(job.duties).length > 0 && (
                            <dl>
                                <dt>주요 업무</dt>
                                <dd>
                                    <ul>
                                        {toArray(job.duties).map((item, i) => <li key={`duty-${i}`}>{item}</li>)}
                                    </ul>
                                </dd>
                            </dl>
                        )}

                        {/* 자격 요건 */}
                        {toArray(job.requirements).length > 0 && (
                            <dl>
                                <dt>자격 요건</dt>
                                <dd>
                                    <ul>
                                        {toArray(job.requirements).map((item, i) => <li key={`req-${i}`}>{item}</li>)}
                                    </ul>
                                </dd>
                            </dl>
                        )}

                        {/* 우대 사항 */}
                        {toArray(job.preferences).length > 0 && (
                            <dl>
                                <dt>우대 사항</dt>
                                <dd>
                                    <ul>
                                        {toArray(job.preferences).map((item, i) => <li key={`pref-${i}`}>{item}</li>)}
                                    </ul>
                                </dd>
                            </dl>
                        )}

                        {/* 근무지 / 근무 시간 등 */}
                        {toArray(job.working).length > 0 && (
                            <dl>
                                <dt>근무지 / 근무 시간</dt>
                                <dd>
                                    <ul>
                                        {toArray(job.working).map((item, i) => <li key={`work-${i}`}>{item}</li>)}
                                    </ul>
                                </dd>
                            </dl>
                        )}
                    </div>


                    <div className="btn-wrap flex-center text-center">
                        <Link to="/hr/list" className="list-btn">
                            목록가기
                        </Link>
                        <button className="apply-btn" onClick={() => { setFormClosing(false); setFormOpen(true); }}>
                            지원하기
                        </button>
                    </div>
                </div>
            </section>

            {/* 지원서 팝업 */}
            {formOpen && (
                <div className={`popup-overlay${formClosing ? ' closing' : ''}`} onClick={() => closeForm()}>
                    <div className={`popup apply${formClosing ? ' closing' : ''}`} onClick={e => e.stopPropagation()}>
                        <h3>지원서 작성</h3>
                        <div className="form-wrap">
                            <form className="apply-form" onSubmit={handleSubmit}>
                                <div className="form-tit flex-center">
                                    <span></span>
                                    <strong className="tit-1">지원분야</strong>
                                    <div className="fc-g-2 bold">[{job.hr_job}] {job.hr_tit}</div>
                                </div>

                                <div className="form-scroll scroll-container">
                                    <div className="input-wrap">
                                        <div className="input-box">
                                            <div className="tit"><span>[필수]</span> 이름</div>
                                            <input type="text" placeholder="성함을 입력해주세요" required />
                                        </div>
                                        <div className="input-box">
                                            <div className="tit"><span>[필수]</span> 연락처</div>
                                            <input type="text" placeholder="01012345678" required />
                                        </div>
                                        <div className="input-box">
                                            <div className="tit"><span>[필수]</span> 이메일</div>
                                            <input type="text" placeholder="example@domain.com" required />
                                        </div>
                                        <div className="input-box">
                                            <div className="tit"><span>[필수]</span> 이력서</div>
                                            <div className="file-upload flex-center">
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={handleResumeChange}
                                                    ref={resumeInputRef}
                                                    hidden
                                                />
                                                <span className={resumeName === placeholder ? "fc-g-3" : "fc-black"}>{resumeName}</span>
                                                <button type="button" onClick={() => resumeInputRef.current && resumeInputRef.current.click()}>
                                                    <img className="img-responsive" src="/images/ico_upload.png" alt="파일 업로드 버튼" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="policy-wrap">
                                        <div className="check-box">
                                            <input id="checkbox-set" type="checkbox" defaultChecked required />
                                            <label htmlFor="checkbox-set">
                                                <img src="/images/ico_check.svg" alt="체크박스" />
                                                <b className="fc-s">[필수]</b> 개인정보 처리방침 동의
                                            </label>
                                        </div>
                                        <button type="button" className="view-btn" onClick={() => setPolicyOpen(true)}>
                                            보기
                                        </button>
                                    </div>

                                    <div className="input-wrap">
                                        <div className="input-box">
                                            <div className="tit">포트폴리오 <span className="fc-g-2">(디자인 분야)</span></div>
                                            <div className="file-upload flex-center">
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={handlePortfolioChange}
                                                    ref={portfolioInputRef}
                                                    hidden
                                                />
                                                <span className={portfolioName === placeholder ? "fc-g-3" : "fc-black"}>{portfolioName}</span>
                                                <button type="button" onClick={() => portfolioInputRef.current && portfolioInputRef.current.click()}>
                                                    <img className="img-responsive" src="/images/ico_upload.png" alt="파일 업로드 버튼" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="input-box">
                                            <div className="tit">개인/업무 유관 URL</div>
                                            <input type="text" placeholder="https://homepage.com" />
                                        </div>
                                        <div className="input-box">
                                            <div className="tit">지원동기 <span className="fc-g-2 bold">해당 분야에 지원한 사유를 간단하게 적어주세요</span></div>
                                            <textarea placeholder="내용을 입력해주세요"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="btn-wrap flex-center text-center">
                                    <button className="list-btn" onClick={() => closeForm()}>
                                        취소하기
                                    </button>
                                    <button className="apply-btn" type="submit">
                                        제출하기
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* 제출 완료 팝업 */}
            {completeOpen && (
                <div className={`popup-overlay${completeClosing ? ' closing' : ''}`} onClick={closeComplete}>
                    <div className={`popup${completeClosing ? ' closing' : ''}`} onClick={e => e.stopPropagation()}>
                        <div className="finish-wrap txt-center">
                            <div className="step-circle fc-m"><b className="flex-center">서류<br />전형</b></div>
                            <h1>제출 완료</h1>
                            <div className="fc-g-2">귀하의 지원에 감사드립니다.</div>
                            <ul className="detail-info">
                                <li>전형 일정 및 결과는 지원서에 기재한 연락처로 개별 안내 예정입니다.</li>
                                <li>허위사실 기재 및 타인의 저작물 도용 시 불이익을 받을 수 있습니다.</li>
                            </ul>
                        </div>
                        <div className="btn-wrap">
                            <button className="finish-btn" onClick={closeComplete}>공고 보기</button>
                        </div>
                    </div>
                </div>
            )}

            {policyOpen && <PolicyPopup onClose={() => setPolicyOpen(false)} />}
        </div>
    );
}
