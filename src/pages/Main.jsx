import './Main.css';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CommonSwiper from '../components/commonSwiper';
import useScrollEffect from '../hooks/useScrollEffect';

import { jobsListRepo, prRepo, pressRepo } from '../repos';



const Main = () => {

    const sectionsRef = useRef([]); // fullpage 사용시 추가
    useScrollEffect({}, sectionsRef); // fullpage 사용시 추가

    const [newsSlides, setNewsSlides] = useState([]); // 홍보영상/보도자료 최신 3개
    const [hrCounts, setHrCounts] = useState({ total: 0, intern: 0, entry: 0, career: 0 });

    // 자연스러운 무한 스크롤 리스트를 위한 useEffect 추가
    useEffect(() => {
        const list = document.querySelector(".rolling-list");
        if (!list) return;

        let posY = 0;
        const speed = 0.3; // 높을수록 빨라짐

        const step = () => {
            posY -= speed;
            if (Math.abs(posY) >= list.scrollHeight / 2) {
                posY = 0;
            }
            list.style.transform = `translateY(${posY}px)`;
            requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }, []);

    // 날짜 포맷 통일 (YYYY.MM.DD → YYYY-MM-DD)
    const normalizeDate = (s) => {
        if (!s) return null;
        const withDash = s.includes('.') ? s.replaceAll('.', '-').trim() : s.trim();
        const d = new Date(withDash);
        return isNaN(d.getTime()) ? null : d;
    };

    // D-day
    const dDay = (periodText) => {
        if (!periodText || periodText === '상시채용') return '상시채용';
        const parts = periodText.split('~').map(s => s.trim());
        const endStr = parts[1] || '';
        if (!endStr) return '상시채용';
        const end = new Date(endStr.replaceAll('.', '-'));
        if (isNaN(end.getTime())) return '상시채용';
        const today = new Date();
        end.setHours(0, 0, 0, 0); today.setHours(0, 0, 0, 0);
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        if (diff < 0) return '채용마감';
        if (diff === 0) return 'D-day';
        return `D-${diff}`;
    };


    // 뉴스(홍보영상 1 + 보도자료 최대 4) 로드
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                // 필요 개수보다 넉넉히 가져와 정렬 후 선별
                const [{ items: prItems = [] } = {}, { items: pressItems = [] } = {}] = await Promise.all([
                    prRepo?.list?.(1, 20) ?? Promise.resolve({ items: [] }),
                    pressRepo?.list?.(1, 50) ?? Promise.resolve({ items: [] }),
                ]);

                // 날짜 파싱 함수는 위에서 선언한 normalizeDate 사용
                const sortByDateDesc = (arr, getDateText) =>
                    [...arr].sort((a, b) =>
                        (normalizeDate(getDateText(b))?.getTime?.() || 0) -
                        (normalizeDate(getDateText(a))?.getTime?.() || 0)
                    );

                // 1) PR 최신 1건
                const prSorted = sortByDateDesc(prItems, it => it.date || it.createdAt || '');
                const prTop = prSorted[0];

                // 2) 보도자료 최신 4건
                const pressSorted = sortByDateDesc(pressItems, it => it.date || it.createdAt || '');
                const pressTop4 = pressSorted.slice(0, 4);

                // 3) 슬라이드 구성: PR(1) → PRESS(최대 4)
                const slides = [];

                if (prTop) {
                    const prDateText = (prTop.date || prTop.createdAt || '').replaceAll('-', '.');
                    const prSrc = prTop.youtubeId
                        ? `https://www.youtube.com/embed/${prTop.youtubeId}`
                        : (prTop.href || '');

                    slides.push(
                        <div key={`pr-${prTop.id}`} className="news-slider flex-center">
                            <iframe
                                src={prSrc}
                                title={prTop.title}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                            <div className="news-info">
                                <a href={prSrc} target="_blank" rel="noopener noreferrer">
                                    <h5>홍보영상</h5>
                                    <h3>{prTop.title}</h3>
                                    <div className="news-data">{prDateText}</div>
                                </a>
                            </div>
                        </div>
                    );
                }

                pressTop4.forEach(it => {
                    const dateText = (it.date || it.createdAt || '').replaceAll('-', '.');
                    slides.push(
                        <div key={`press-${it.id}`} className="news-slider">
                            <div className="news-info">
                                <a href={it.href} target="_blank" rel="noopener noreferrer">
                                    <h5>보도자료{it.source ? ` · ${it.source}` : ''}</h5>
                                    <h3>{it.title}</h3>
                                    <div className="news-data">{dateText}</div>
                                </a>
                            </div>
                        </div>
                    );
                });

                if (!alive) return;
                setNewsSlides(slides);
            } catch {
                setNewsSlides([]);
            }
        })();
        return () => { alive = false; };
    }, []);


    // 채용 현황 로드
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const { items = [] } = await jobsListRepo.list(1, 9999);
                // 마감 제외
                const open = items.filter(it => dDay(it.txt_4) !== '채용마감');

                // 경력 카테고리 집계
                // 기준: 인턴="인턴", 신입/무관="신입"+"경력무관", 경력="경력"
                const intern = open.filter(it => it.txt_1 === '인턴').length;
                const career = open.filter(it => it.txt_1 === '경력').length;
                const entry = open.filter(it => it.txt_1 === '신입' || it.txt_1 === '경력무관').length;

                if (!alive) return;
                setHrCounts({ total: open.length, intern, entry, career });
            } catch (e) {
                if (!alive) return;
                setHrCounts({ total: 0, intern: 0, entry: 0, career: 0 });
            }
        })();
        return () => { alive = false; };
    }, []);

    // 로고 이미지 배열 (기존 그대로)
    const logoImages = useMemo(() => ([
        { src: "/images/capital/v1/capital_01.png", alt: "하나캐피탈" },
        { src: "/images/capital/v1/capital_02.png", alt: "롯데렌터카" },
        { src: "/images/capital/v1/capital_03.png", alt: "롯데오토리스" },
        { src: "/images/capital/v1/capital_04.png", alt: "롯데캐피탈" },
        { src: "/images/capital/v1/capital_05.png", alt: "레드캡렌터카" },
        { src: "/images/capital/v1/capital_06.png", alt: "신한카드" },
        { src: "/images/capital/v1/capital_07.png", alt: "삼성카드" },
        { src: "/images/capital/v1/capital_08.png", alt: "NH농협캐피탈" },
        { src: "/images/capital/v1/capital_09.png", alt: "산은캐피탈" },
        { src: "/images/capital/v1/capital_10.png", alt: "IM캐피탈" },
        { src: "/images/capital/v1/capital_11.png", alt: "SK렌터카" },
        { src: "/images/capital/v1/capital_12.png", alt: "BNK캐피탈" },
        { src: "/images/capital/v1/capital_13.png", alt: "오릭스" },
        { src: "/images/capital/v1/capital_14.png", alt: "한국캐피탈" },
        { src: "/images/capital/v1/capital_15.png", alt: "우리카드" },
        { src: "/images/capital/v1/capital_16.png", alt: "우리금융캐피탈" },
        { src: "/images/capital/v1/capital_17.png", alt: "JB우리캐피탈" },
        { src: "/images/capital/v1/capital_18.png", alt: "MG캐피탈" },
    ]), []);


    return (
        <>
            <section ref={el => sectionsRef.current[0] = el} className="visual">
                <div className="main-vod">
                    <video
                        src="/videos/ks_visual.mp4"
                        type="video/mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>
                <div className="inner txt-wrap">
                    <h3 className="ani-hidden">
                        <div className="ani-up" lang="en" translate="no">KS Group</div>
                    </h3>
                    <h1 className="ani-hidden">
                        <div className="ani-up">자동차부터 <span className="mbr"></span>마케팅까지</div>
                    </h1>
                    <div className="txt ani-hidden">
                        <div className="ani-up">
                            더 나은 내일을 만드는 <b>KS 그룹</b>,<br />
                            당신과 함께합니다.
                        </div>

                    </div>
                </div>
            </section>

            <section ref={el => sectionsRef.current[1] = el} className="content ct-01">
                <span className="img-k"><img className="img-responsive" src="/images/main_k.png" alt=""></img></span>
                <span className="img-s"><img className="img-responsive" src="/images/main_s.png" alt=""></img></span>
                <div className="inner">
                    <h1 className="ani-up">새로운 혁신을 <span className="mbr"></span>선도하는 <strong className="fc-m" lang="en" translate="no">KS</strong></h1>
                    <div className="txt ani-up">최고의 전문성과 신뢰를 바탕으로 다양한 산업에서 혁신적인 솔루션을 제공합니다.</div>
                    <Link to="/business/rentcar" className="link-btn flex-center ani-up">
                        <div className="bold">사업분야 바로가기</div>
                        <div className="arrow">
                            <img className="img-responsive" src="/images/ico_arrow_bold.svg" alt="바로가기"></img>
                        </div>
                    </Link>
                    <ul>
                        <li>
                            <Link to="/business/rentcar" className="bg-rentcar ani-up">
                                <span>자동차<br />금융 컨설팅</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/business/purchase" className="bg-purchase ani-up">
                                <span>전국매입</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/business/export" className="bg-export ani-up">
                                <span>해외수출</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/business/ads" className="bg-ads ani-up">
                                <span>광고마케팅</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>

            <section ref={el => sectionsRef.current[2] = el} className="content ct-02">
                <div className="inner">
                    <h1 className="ani-up">KS그룹의 <span className="mbr"></span><b>희망찬 이야기들</b></h1>
                    <div className="newSwiper-wrap ani-up">
                        <div className="newSwiper">
                            <CommonSwiper
                                slides={newsSlides.length ? newsSlides : []}
                                options={{
                                    slidesPerView: 'auto',
                                    spaceBetween: 20,
                                    navigation: { nextEl: '.next-main', prevEl: '.prev-main' },
                                    scrollbar: { draggable: true },
                                }}
                            />
                        </div>
                        <div className="swiper-button prev-main">
                            <img src="/images/ico_arrow_light.svg" alt="다음으로"></img>
                        </div>
                        <div className="swiper-button next-main">
                            <img src="/images/ico_arrow_light.svg" alt="이전으로"></img>
                        </div>
                    </div>

                </div>
            </section>

            <section ref={el => sectionsRef.current[3] = el} className="ct-03">
                <div className="inner">
                    <div className="hr-wrap">
                        <div className="interview-img ani-up">
                            <img className="img-responsive" src="/images/img_interview.png" alt="인터뷰 동영상 이미지"></img>
                        </div>
                        <div className="hr-link flex-center">
                            <span><b>{hrCounts.total}</b>의 채용공고가 <b>진행 중</b> 입니다.</span>
                            <Link to="/hr/list" className="flex-center">전체보기 <img src="/images/ico_arrow_light.svg" alt="화살표"></img></Link>
                        </div>
                    </div>

                    <div className="tit-wrap">
                        <h5 className="ani-hidden">
                            <div className="ani-up" lang="en" translate="no">KS Group</div>
                        </h5>
                        <h1 className="ani-hidden">
                            <div className="ani-up">
                                당신의 시작,<br />우리의 성장
                            </div>
                        </h1>
                        <a
                            href="https://youtu.be/Aq86f_JsEfw?si=XGuS20X7sqFu-Hvx" className="link-btn flex-center ani-up" target="_blank" rel="noopener noreferrer">
                            <div className="bold">인터뷰 영상보기</div>
                            <div className="arrow">
                                <img className="img-responsive" src="/images/ico_arrow_bold.svg" alt="바로가기"></img>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="main-hr-ing">
                    <div className="inner flex-center ani-up">
                        <div className="hr-txt">
                            <span>인턴</span>
                            <strong className="fc-m">{hrCounts.intern}</strong>
                        </div>
                        <img src="/images/ico_arrow_light.svg" alt="화살표" />
                        <div className="hr-txt">
                            <span>신입</span>
                            <strong className="fc-m">{hrCounts.entry}</strong>
                        </div>
                        <img src="/images/ico_arrow_light.svg" alt="화살표" />
                        <div className="hr-txt">
                            <span>경력</span>
                            <strong>{hrCounts.career}</strong>
                        </div>
                    </div>
                </div>
            </section>



            <section className="ct-04">
                <div className="inner">
                    <h1 className="ani-up">파트너 & 협력사</h1>
                    <div className="txt ani-up">KS 그룹은 다양한 기업 및 기관과 협력하여 최상의 서비스를 제공합니다.</div>
                    <div className="rolling-wrapper ani-up">
                        <ul className="rolling-list">
                            {[...logoImages, ...logoImages, ...logoImages].map((logo, index) => (
                                <li key={index}><img className="img-responsive" src={logo.src} alt={logo.alt} /></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="ct-05">
                <div className="inner flex-center">
                    <div className="app-link">
                        <h1 className="ani-hidden">
                            <div className="ani-up"><span className="fc-m">최적의 서비스,</span> <span className="fc-s">KS멤버스</span></div>
                            <div className="ani-up">지금 경험해 보세요</div>
                        </h1>
                        <dl className="flex-center">
                            <dt>
                                <a href="https://play.google.com/store/apps/details?id=your.app.id" target="_blank" rel="noopener noreferrer">
                                    <img className="img-responsive" src="/images/img_googleplay.svg" alt="구글플레이 다운로드"></img>
                                </a>
                                <a href="https://apps.apple.com/kr/app/your-app-id" target="_blank" rel="noopener noreferrer">
                                    <img className="img-responsive" src="/images/img_appstore.svg" alt="앱스토어 다운로드"></img>
                                </a>
                            </dt>
                            <dd>
                                <img className="img-responsive" src="/images/img_qr.png" alt="앱다운로드 큐알코드"></img>
                                <div className="txt">앱 다운로드 QR 코드</div>
                            </dd>
                        </dl>
                    </div>
                    <div className="app-img">
                        <img className="img-responsive" src="/images/img_app.png" alt="로고 앱 아이콘"></img>
                    </div>
                </div>
            </section>
        </>


    );
};

export default Main;


