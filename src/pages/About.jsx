import './About.css';
import SubVisual from "../components/SubVisual";
import { useEffect, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ResetKeyContext } from "../components/ScrollManager";


const About = () => {
  const resetKey = useContext(ResetKeyContext);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 공통 애니메이션(useScrollEffect)이 먼저 실행되도록 약간 지연
    const timer = setTimeout(() => {
      const pins = gsap.utils.toArray(".pin-me");

      pins.forEach((pin, i) => {
        if (i === pins.length - 1) return;
        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: () => "+=" + window.innerHeight,
          pin: true,
          pinSpacing: false,
          scrub: 1,
          markers: false,
          id: `pin-${i}`,
        });
      });

      // 마지막 pin은 기존대로 유지
      if (pins.length > 0) {
        ScrollTrigger.create({
          trigger: pins[pins.length - 1],
          start: "top top",
          endTrigger: ".ac-05",
          end: "top bottom",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          markers: false,
          id: "last-pin",
        });
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      // pin 트리거만 해제 (공통에서 전체 해제하므로 중복 방지)
      ScrollTrigger.getAll().forEach(trigger => {
        if (
          trigger.vars.id &&
          (trigger.vars.id.startsWith('pin-') || trigger.vars.id === 'last-pin')
        ) {
          trigger.kill();
        }
      });
    };
  }, [resetKey]);

  // (휠 속도 조절 useEffect 완전히 제거)

  useEffect(() => {
    // ac-05의 ani-up 애니메이션 완료 후 video-wrap 확장 애니메이션
    const timer = setTimeout(() => {
      const ac05AniUpElements = document.querySelectorAll('.ac-05 .ani-up');
      const videoWrap = document.querySelector('.ac-05 .video-wrap');
      
      if (ac05AniUpElements.length > 0 && videoWrap) {
        // 모든 ani-up 애니메이션 완료 대기
        const checkAnimationsComplete = () => {
          const allComplete = Array.from(ac05AniUpElements).every(el => {
            const computedStyle = window.getComputedStyle(el);
            return computedStyle.opacity === '1' && computedStyle.transform !== 'translateY(50px)';
          });
          
          if (allComplete) {
            // video-wrap 확장 애니메이션
            gsap.to(videoWrap, {
              width: '100%',
              height: '60vh',
              borderRadius: '50px',
              duration: 1,
              ease: 'power2.out'
            });
            
            // 스크롤 방향에 따른 애니메이션 제어
            let lastScrollTop = 0;
            let isExpanded = false;
            
            ScrollTrigger.create({
              trigger: '.ac-05',
              start: 'top 20%',
              end: 'bottom center',
              scrub: 1,
              onUpdate: (self) => {
                const currentScrollTop = window.pageYOffset;
                const isScrollingUp = currentScrollTop < lastScrollTop;
                lastScrollTop = currentScrollTop;
                
                if (isScrollingUp && isExpanded) {
                  // 스크롤 올릴 때 원래 크기로
                  gsap.to(videoWrap, {
                    width: '15vw',
                    height: '40vh',
                    borderRadius: '100px 0 100px 0',
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                      // video-wrap 축소 완료 후 video-txt 숨김
                      const videoTxt = videoWrap.querySelector('.video-txt span');
                      if (videoTxt) {
                        gsap.to(videoTxt, {
                          y: 100,
                          opacity: 0,
                          duration: 0.3,
                          ease: 'power2.out'
                        });
                      }
                    }
                  });
                  isExpanded = false;
                } else if (!isScrollingUp && !isExpanded && self.progress > 0.3) {
                  // 스크롤 내릴 때 확장
                  gsap.to(videoWrap, {
                    width: '100%',
                    height: '60vh',
                    borderRadius: '50px',
                    duration: 1,
                    ease: 'power2.out',
                    onComplete: () => {
                      // video-wrap 확장 완료 후 video-txt 애니메이션
                      const videoTxt = videoWrap.querySelector('.video-txt span');
                      if (videoTxt) {
                        gsap.to(videoTxt, {
                          y: 0,
                          opacity: 1,
                          duration: 0.8,
                          ease: 'power2.out'
                        });
                      }
                    }
                  });
                  isExpanded = true;
                }
              }
            });
          } else {
            // 아직 애니메이션 진행 중이면 다시 체크
            requestAnimationFrame(checkAnimationsComplete);
          }
        };
        
        // 애니메이션 완료 체크 시작
        setTimeout(checkAnimationsComplete, 100);
      }
    }, 1000); // ac-05 섹션이 로드된 후 시작

    return () => clearTimeout(timer);
  }, [resetKey]);


  return (
    <>
      <SubVisual title="KS소개" type="about" bgClass="bg-about" />
      
      <section className="about-content ac-01 txt-center">
        <div className="inner">
          <div className="line-01 ani-down"></div>
          <h3 className="fc-m  ani-down">Korea Standard</h3>
          <h1 className="ani-down"> 
            대한민국 모빌리티 산업의<br />
            표준을 새로 쓰다.
          </h1>
          <div className="line-01 arrow ani-down"></div>
          <div className="txt-01 fc-g-2 ani-up">
            KS그룹은 2018년 인천에서 출발하여, 자동차 산업 전반을 아우르는 모빌리티 중심<br />
            기업군으로 성장해온 종합 그룹입니다.
          </div>
        </div>
      </section>

      

      <div className="pin-me-group">
        <section className="about-content content ac-02 members txt-center pin-me">
          <div className="inner">
            <h1 className="ani-up">설립 이후 매해 눈에 띄는 성장을 거듭하며,</h1>
            <div className="txt-02 ani-up">
              현재는 임직원 500명 규모의 전국 최대급 모빌리티 전문 그룹으로 자리매김하였습니다.
            </div>
            <div className="txt-box">임직원</div>
            <dl className="flex-center">
              <dt><img src="/images/ico_people.svg" alt="임직원 아이콘"></img></dt>
              <dd>+ <span className="ani-count" data-count="500">0</span></dd>
            </dl>
          </div>
        </section>

        <section className="about-content content ac-03 company txt-center pin-me">
          <div className="inner">
            <h1 className="ani-up">
              우리는 신차 구매부터<br />
              특장차, 중고차 유통, 중고차 수출, 광고 마케팅까지</h1>
            <div className="txt-02 ani-up">
              모든 자동차 유통 과정의 전주기를 통합하여 운영하는 국내에서도 드문 구조의 그룹입니다.
            </div>
            <div className="txt-box">계열사</div>
            <dl className="flex-center">
              <dt><img src="/images/ico_company.svg" alt="회사 아이콘"></img></dt>
              <dd>+ <span className="ani-count" data-count="4">0</span></dd>
            </dl>
          </div>
        </section>

        <section className="about-content content ac-04 pin-me" >
          <div className="inner flex-center">
            <div className="tit-box">
              <img src="/images/ico_marks.png" alt="따옴표 아이콘"></img>
              <h1 className="ani-up">KS그룹은</h1>
              <div className="txt-02 ani-up">
                자동차 산업에 머무르지 않고<br />
                모빌리티를 중심으로 한<br />
                생활, 공간, 경험의 확장까지<br />
                준비하고 있습니다.
              </div>
            </div>
            <div className="banner-box">
              <div className="banner-txt bg-01 ani-left">
                <p>통합 플랫폼을 통한</p>
                <h2>서비스 고도화</h2>
              </div>
              <div className="banner-txt bg-02 ani-left">
                <p>글로벌 네트워크 기반의</p>
                <h2>유통 다각화</h2>
              </div>
              <div className="banner-txt bg-03 ani-left">
                <p>데이터 기반 운영과 AI 기술 접목을 통한</p>
                <h2>스마트한 전환</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      

      <section className="about-content content ac-05">
        <div className="inner">
          <h3 className="fc-s ani-up">A New Standard</h3>
          <h1 className="fc-black ani-up">
            <div className="fc-m">우리는 단순히</div>
            차량을 유통하는 기업이 아닌,
          </h1>
          <div className="txt-01 ani-up">
            사람과 이동을 연결하고, 브랜드와 고객의 거리를 좁히는 기업으로 <span className="br"></span>
            새로운 기준을 만들어 갑니다.
          </div>

          <div className="video-wrap">
            <video
                src="/videos/sub_content_01.mp4"
                type="video/mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="video-txt flex-center">
               <span>현장 중심의 민첩한 조직과 전문적인 실행력으로 모빌리티 산업의 혁신자가 되겠습니다.</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;