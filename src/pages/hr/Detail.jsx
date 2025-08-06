import { useState, useEffect, useRef } from 'react';
import PolicyPopup from '../../components/PolicyPopup';
import { Link } from 'react-router-dom';

function Detail() {
    const [formOpen, setFormOpen] = useState(false);
    const [formClosing, setFormClosing] = useState(false);
    const [completeOpen, setCompleteOpen] = useState(false);
    const [completeClosing, setCompleteClosing] = useState(false);
    const [policyOpen, setPolicyOpen] = useState(false);

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

    const [resumeName, setResumeName] = useState("파일첨부 (50MB 이하 PDF)");
    const [portfolioName, setPortfolioName] = useState("파일첨부 (50MB 이하 PDF)");
    const placeholder = "파일첨부 (50MB 이하 PDF)";

    const resumeInputRef = useRef(null);
    const portfolioInputRef = useRef(null);

    const handleResumeChange = (e) => {
        if (e.target.files.length > 0) {
        setResumeName(e.target.files[0].name);
        } else {
        setResumeName("파일첨부 (50MB 이하 PDF)");
        }
    };

    const handlePortfolioChange = (e) => {
        if (e.target.files.length > 0) {
        setPortfolioName(e.target.files[0].name);
        } else {
        setPortfolioName("파일첨부 (50MB 이하 PDF)");
        }
    };

    const isAnyPopupOpen = formOpen || completeOpen || policyOpen;

    useEffect(() => {
        if (isAnyPopupOpen) {
        // 팝업이 열릴 때: body 스크롤 잠금
        document.body.style.overflow = 'hidden';
        } else {
        // 팝업이 닫힐 때: 원래대로 복구
        document.body.style.overflow = '';
        }

        // cleanup 함수: 컴포넌트가 언마운트될 때 스크롤 잠금 해제
        return () => {
        document.body.style.overflow = '';
        };
    }, [isAnyPopupOpen]);

    return (
        <div className="hr-detail">
            <section className="detail-content">
                <div className="inner">
                    <h2>채용 상세보기</h2>
                    <div className="detail-txt">
                        본 페이지는 채용 공고의 세부 내용을 안내합니다. 아래 버튼을 클릭하여 지원서를 제출해 주세요.
                    </div>

                    <div className="hr-info">
                        <p className="dday">D-10</p>
                        <h3>[기술직] 프론트엔드 개발자 채용</h3>
                        <div className="flex-center">
                            <span>경력무관</span>
                            <span className="bar"></span>
                            <span>정규직</span>
                            <span className="bar"></span>
                            <span>본점</span>
                            <span className="bar"></span>
                            <span className="fc-s">2025.06.01 ~ 2025.06.30</span>
                        </div>
                    </div>

                    <div className="detail-info">
                        <h4 className="flex-center"><span></span>직무 소개</h4>
                        <p>
                            글로벌 표준 클라우드 아키텍처를 기반으로 클라우드 인프라/플랫폼 관점의 로드맵을 수립하여 장애에 강건한 글로벌 클라우드를 개발/운영하는 업무를 수행합니다.
                        </p>

                        <dl>
                            <dt>주요 업무</dt>
                            <dd>
                                <ul>
                                    <li>웹 기반 신규서비스 프론트앤드 개발</li>
                                    <li>개발 업무 분석 및 서비스 기술 적용</li>
                                </ul>
                            </dd>
                        </dl>

                        <dl>
                            <dt>자격 요건</dt>
                            <dd>
                                <ul>
                                    <li>학력무관</li>
                                    <li>프론트엔드 개발 경력 최소 1년 이상</li>
                                    <li>React, Typescirpt, Nextjs 등 SPA 프레임워크를 이용한 프론트엔드 개발 경력</li>
                                    <li>RestFul API에 대한 경험 및 지식 보유자</li>
                                    <li>Git 등 형상관리 시스템 경험자</li>
                                </ul>
                            </dd>
                        </dl>

                        <dl>
                            <dt>우대 사항</dt>
                            <dd>
                                <ul>
                                    <li>실제 서비스 운영 및 유지 보수 1년 이상의 경험</li>
                                    <li>서비스의 목표에 대한 이해를 바탕으로 Ownership을 가지고 임하시는 분</li>
                                    <li>공학 계열 전공자(컴퓨터공학 등)</li>
                                </ul>
                            </dd>
                        </dl>

                        <dl>
                            <dt>근무지 / 근무 시간</dt>
                            <dd>
                                <ul>
                                    <li>인천 송도</li>
                                    <li>주 5일(월 ~ 금 / 09:00 ~ 18:00 )</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>

                    <div className="btn-wrap flex-center text-center">
                        <Link to="/hr/list" className="list-btn">
                            목록가기
                        </Link>
                        <button className="apply-btn" onClick={() => { setFormClosing(false); setFormOpen(true);}} >
                            지원하기
                        </button>
                    </div>
                </div>
            </section>

            {formOpen && (
                <div
                    className={`popup-overlay${formClosing ? ' closing' : ''}`}
                    onClick={() => closeForm()}
                >
                    <div
                        className={`popup apply ${formClosing ? ' closing' : ''}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3>지원서 작성</h3>
                        <div className="form-wrap">
                            <form className="apply-form" onSubmit={handleSubmit}>
                                <div className="form-tit flex-center">
                                    <span></span>
                                    <strong className="tit-1">지원분야</strong>
                                    <div className="fc-g-2 bold">[영업직] 신차 영업사원 채용</div>
                                </div>

                                <div className="form-scroll scroll-container">
                                    <div className="input-wrap">
                                        <div className="input-box">
                                            <div className="tit"><span>[필수]</span> 이름</div>
                                            <input type="text" placeholder="성함을 입력해주세요" required></input>
                                        </div>
                                        <div className="input-box">
                                            <div className="tit"><span>[필수]</span> 연락처</div>
                                            <input type="text" placeholder="01012345678" required></input>
                                        </div>
                                        <div className="input-box">
                                            <div className="tit"><span>[필수]</span> 이메일</div>
                                            <input type="text" placeholder="example@domain.com" required></input>
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
                                                <span className={resumeName === placeholder ? "fc-g-3" : "fc-black"}>
                                                    {resumeName}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => resumeInputRef.current && resumeInputRef.current.click()}
                                                >
                                                    <img className="img-responsive" src="/images/ico_upload.png" alt="파일 업로드 버튼" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="policy-wrap">
                                        <div className="check-box">
                                            <input id="checkbox-set" type="checkbox" defaultChecked required></input>
                                            <label htmlFor="checkbox-set">
                                                <img src="/images/ico_check.svg" alt="체크박스"></img>
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
                                                <span className={portfolioName === placeholder ? "fc-g-3" : "fc-black"}>
                                                    {portfolioName}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => portfolioInputRef.current && portfolioInputRef.current.click()}
                                                >
                                                    <img className="img-responsive" src="/images/ico_upload.png" alt="파일 업로드 버튼" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="input-box">
                                            <div className="tit">개인/업무 유관 URL</div>
                                            <input type="text" placeholder="https://homepage.com" ></input>
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

            {completeOpen && (
                <div
                    className={`popup-overlay${completeClosing ? ' closing' : ''}`}
                    onClick={closeComplete}
                >
                    <div
                        className={`popup ${completeClosing ? ' closing' : ''}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="finish-wrap txt-center">
                            <div className="step-circle fc-m">
                                <b className="flex-center">서류<br />전형</b>
                            </div>
                            <h1>제출 완료</h1>
                            <div className="fc-g-2">귀하의 지원에 감사드립니다.</div>
                            <ul className="detail-info">
                                <li>전형 일정 및 결과는 지원서에 기재해 주신 연락처로 개별 안내 드릴 예정입니다.</li>
                                <li>지원서 내 허위사실 기재 및 타인의 저작물 도용 시 전형 과정에서 불이익을 받을 수 있습니다.</li>
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

export default Detail;