import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);


const Export = () => {
    const leftBarRef = useRef(null);
    const rightBarRef = useRef(null);
    const leftOuterRef = useRef(null);
    const leftInnerRef = useRef(null);
    const rightOuterRef = useRef(null);
    const rightInnerRef = useRef(null);
    const leftTxtRef = useRef(null);
    const rightTxtRef = useRef(null);
    const pathRef = useRef(null);
    const balloonRef = useRef(null);

    const location = useLocation();
    const [resetKey, setResetKey] = useState(0);

    useEffect(() => {
        const handleReset = () => setResetKey((prev) => prev + 1);
        window.addEventListener('resetAnimations', handleReset);
        return () => window.removeEventListener('resetAnimations', handleReset);
    }, []);

    useLayoutEffect(() => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        const timer = setTimeout(() => {
            const path = pathRef.current;
            gsap.set([leftBarRef.current, rightBarRef.current], {
                scaleY: 0,
                transformOrigin: 'bottom center',
            });
            gsap.set(
                [leftOuterRef.current, leftInnerRef.current, rightOuterRef.current, rightInnerRef.current],
                {
                  opacity: 0,
                  scale: 0.5,
                  transformOrigin: 'center',
                }
            );
            gsap.set(path, {
                strokeDasharray: '8 4',
                strokeDashoffset: 1000,
                opacity: 0,
            });
            gsap.set(balloonRef.current, {
                opacity: 0,
                y: 0,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: '.ec-01',
                  start: 'top center',
                  toggleActions: 'play none none reset',
                },
                defaults: { ease: 'power2.out' },
            });

            tl
            .to(leftBarRef.current, { scaleY: 1, duration: 0.6 })
            .to(rightBarRef.current, { scaleY: 1, duration: 0.6 })
            .to([leftOuterRef.current, leftInnerRef.current], {
                opacity: 1,
                scale: 1,
                duration: 0.2,
            }, '-=0.2')
            .to([leftTxtRef.current], {
                opacity: 1,
                duration: 0.4,
                stagger: 0.2,
            })
            .to([rightOuterRef.current, rightInnerRef.current], {
              opacity: 1,
                scale: 1,
                duration: 0.2,
            }, '-=0.2')
            .to([rightTxtRef.current], {
                opacity: 1,
                duration: 0.4,
                stagger: 0.2,
            })
            .to(path, {
                opacity: 1,
                strokeDashoffset: 0,
                duration: 1.5,
            });

            tl.to(balloonRef.current, {
                opacity: 1,
                duration: 0.5,
            }, '-=1');

            gsap.to(balloonRef.current, {
                y: -10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                duration: 1,
            });
        

        }, 50);
        
        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [location.pathname, resetKey]);
      

    return (
    
        <div className="business">

            <section className="export-content ec-01">
                <div className="inner">
                    <div className="tit-wrap txt-center">
                        <h3 className="ani-hidden"><div className="ani-up-sub">KS<b>오토트레이딩</b></div></h3>
                        <h1 className="ani-hidden">
                            <div className="ani-up-sub">
                                <span className="fc-s">글로벌 중고차</span>
                                <span className="fc-g-3"> 수출 시장에서</span>
                                <span className="br"></span>
                                <span className="fc-m"> 신뢰성과 경쟁력</span>
                                을 갖춘 선도적인 기업
                            </div>
                            
                        </h1>
                    </div> 
                    <div className="graph-wrapper">
                        <div className="left-txt" ref={leftTxtRef}>
                            2023년에는 <span className="bold">1,235대</span>의 차량을 수출하며
                            <b className="fc-g-2"><span className="fc-s">27억 원</span> 달성</b>
                        </div>
                        <div className="graph-box">
                            <div className="speech-bubble" ref={balloonRef} style={{left: '74%'}}>
                                55% 증가
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 360 321"
                                width="100%"
                                height="100%"
                                preserveAspectRatio="xMidYMid meet"
                                fill="none"
                            >

                                {/* 바 (왼쪽, 오른쪽) */}
                                <rect ref={leftBarRef} x="42" y="154" width="84" height="166" rx="20" fill="#E2EEFF" />
                                <rect ref={rightBarRef} x="210" y="62.7" width="114" height="257.3" rx="20" fill="url(#paint0_linear)" />

                                {/* 점 */}
                                <circle ref={leftOuterRef} cx="84" cy="223" r="8" fill="white" />
                                <circle ref={leftInnerRef} cx="84" cy="223" r="5" fill="#146AF0" />
                                <circle ref={rightOuterRef} cx="268" cy="94" r="8" fill="white" />
                                <circle ref={rightInnerRef} cx="268" cy="94" r="5" fill="#146AF0" />

                                {/* 선 */}
                                <path
                                    ref={pathRef}
                                    d="M84 223 A180 180 0 0 0 268 94"
                                    stroke="#146AF0"
                                    fill="none"
                                    strokeWidth="3"
                                    strokeDasharray="8 4"
                                />

                                {/* Gradient 정의 */}
                                <defs>
                                    <linearGradient id="paint0_linear" x1="268" y1="52" x2="268" y2="320" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#293BFF" />
                                    <stop offset="1" stopColor="#0B00A3" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="graph-tit">매출성장</div>
                        </div>
                        <div className="right-txt" ref={rightTxtRef}>
                            2024년에는 <span className="bold">2,300대</span>의 차량을 수출하며<br />
                            <b className="fc-black"><span className="fc-m">42억 원</span> 달성</b>
                        </div>
                    </div>
                </div>
            </section>

            <section className="export-content ec-02">
                <div className="inner">
                    <h1 className="ani-up">
                        체계적인 시스템과 글로벌 네트워크를 통해 <span className="br"></span>
                        최적의 차량을 빠르고 안전하게 수출하는 것을 목표로 합니다.
                    </h1>
                    <ul className="flex-center">
                        <li className="ani-up">
                            <i><img className="img-responsive" src="/images/ico_export_01.svg" alt="수출 아이콘"></img></i>
                            <div className="tit">중고차 수출</div>
                            <div className="txt">
                                다양한 국가의 바이어들과 협력하여 한국 중고차를 글로벌 시장에 공급
                            </div>
                        </li>
                        <li className="ani-up">
                            <i><img className="img-responsive" src="/images/ico_export_02.svg" alt="수출 아이콘"></img></i>
                            <div className="tit">차량 매입 및 경매</div>
                            <div className="txt">
                                국내 차량 소유자와 딜러들을 대상으로 차량 매입 및 경매 서비스 제공
                            </div>
                        </li>
                        <li className="ani-up">
                            <i><img className="img-responsive" src="/images/ico_export_03.svg" alt="수출 아이콘"></img></i>
                            <div className="tit">폐차 연계 서비스</div>
                            <div className="txt">
                                노후 차량을 보다 효율적으로 처리할 수 있도록 폐차 사업에도 확장
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="export-content ec-03">
                <div className="inner">
                    <div class="tit-wrap txt-center">
                        <h4 className="ani-up" lang="en" translate="no">Global Trading</h4>
                        <h2 className="ani-up">
                            단순한 중고차 수출 업체를 넘어 신뢰와 혁신을 <span class="br"></span>
                            기반으로 한 글로벌 자동차 트레이딩 기업으로 자리 잡고자 합니다.
                        </h2>
                    </div>
                    <div className="site-link flex-center ani-up">
                        <a href="https://carverse.co.kr/" target="_blank" rel="noopener noreferrer">
                            <img src="/images/logo_carverse.svg" alt="카버스 바로가기"></img>
                            (주)카버스
                        </a>
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <img src="/images/logo_rotus.svg" alt="케이에스로터스 바로가기"></img>
                            (주)케이에스로터스
                        </a>
                    </div>
                </div>
            </section>

            <section className="export-content ec-03">
                <div className="inner">
                    <div className="content-box">
                        <div className="tit-box ani-right">
                            <div className="fc-s" lang="en" translate="no">KS</div>
                            해외 수출의<br />
                            차별화
                            <div className="txt">
                                지속적인 혁신과 성장으로 한국을<br />
                                대표하는 글로벌 중고차 수출 브랜드로<br />
                                도약할 것입니다.
                            </div>
                        </div>
                        <ul>
                            <li className="ani-left">
                                <h3>01</h3>
                                <h2>신뢰할 수 있는 거래</h2>
                                <div>투명한 거래 프로세스를 통해 바이어와 셀러 모두에게 신뢰를 제공</div>
                            </li>
                            <li className="ani-left">
                                <h3>02</h3>
                                <h2>빠르고 안정적인<br />수출 시스템</h2>
                                <div>다년간 축적된 경험과 네트워크를 기반으로 원활한 수출 진행</div>
                            </li>
                            <li className="ani-left">
                                <h3>03</h3>
                                <h2>다양한 국가와 협업</h2>
                                <div>중동, 아프리카, 동남아시아 등 다양한 시장에 대한 맞춤형 수출 전략 보유</div>
                            </li>
                            <li className="ani-left">
                                <h3>04</h3>
                                <h2>차량 데이터 및<br />품질 관리</h2>
                                <div>출고 전 엄격한 차량 검수를 통해 품질 높은 차량을 공급</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    

    );
};

export default Export;