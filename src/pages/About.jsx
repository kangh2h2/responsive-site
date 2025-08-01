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

      // 마지막 pin은 일반 고정
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

  useEffect(() => {
    const ac05 = document.querySelector('.ac-05');
    const videoWrap = ac05?.querySelector('.video-wrap');
    const videoTxt = videoWrap?.querySelector('.video-txt span');
    const aniUpEls = ac05?.querySelectorAll('.ani-txt-up');
  
    if (!ac05 || !videoWrap || !videoTxt || !aniUpEls.length) return;
  
    // 초기 상태 설정
    gsap.set(videoWrap, {
      width: '15vw',
      height: '40vh',
      borderRadius: '100px 0 100px 0',
    });
  
    gsap.set(videoTxt, {
      opacity: 0,
      y: 100,
    });
  
    // 🔹 ani-txt-up 애니메이션 등록
    aniUpEls.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none reset',
        id: `ac05-aniup-${i}`,
        animation: gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          }
        ),
      });
    });
    
  
    // 🔹 videoWrap 타임라인 애니메이션 등록
    const tl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ac05,
        start: 'top 20%',
        toggleActions: 'play none none reset',
        id: 'ac05-video',
      }
    });
  
    tl.to(videoWrap, {
      width: '100%',
      height: '60vh',
      borderRadius: '50px',
      duration: 1,
      ease: 'power2.inOut'
    });
  
    tl.to(videoTxt, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  
    return () => {
      // 모든 관련 트리거 제거
      ScrollTrigger.getAll().forEach(t => {
        const id = t.vars.id;
        if (id?.startsWith('ac05-aniup-') || id === 'ac05-video') {
          t.kill();
        }
      });
    };
  }, [resetKey]);
  
  useEffect(() => {
    const vennSection = document.querySelector('.venn-section');
    const circles = vennSection?.querySelectorAll('.circle:not(.intersection)');
    const intersection = vennSection?.querySelector('.circle.intersection');
    
    if (!vennSection || !circles.length || !intersection) return;
    
    // 초기 상태: 모든 circle을 중앙에 위치
    gsap.set(circles, {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      scale: 0.5
    });
    
    // intersection은 처음부터 보이도록
    gsap.set(intersection, {
      opacity: 1,
      scale: 1,
      width: '60vw',
      height: '60vw',
      maxWidth: '384px',
      maxHeight: '384px',
    });
    
    // intersection 내부 텍스트들도 초기 설정
    const intersectionTexts = intersection?.querySelectorAll('h2, span');
    if (intersectionTexts) {
      gsap.set(intersectionTexts, {
        opacity: 1,
        scale: 1,
        display: 'flex' // 초기 상태에서 display: flex로 설정
      });
    }
    
    // 애니메이션 타임라인 생성
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: vennSection,
        start: 'top 80%',
        toggleActions: 'play none none reset',
        id: 'venn-animation',
        onEnter: () => {
          // 애니메이션 시작 시 텍스트를 다시 보이게
          if (intersectionTexts) {
            intersectionTexts.forEach(text => {
              text.style.display = 'flex';
            });
          }
        },
        onLeave: () => {
          // 스크롤을 위로 올렸을 때 텍스트를 다시 보이게
          if (intersectionTexts) {
            intersectionTexts.forEach(text => {
              text.style.display = 'flex';
            });
          }
        },
        onEnterBack: () => {
          // 다시 아래로 스크롤할 때 텍스트를 다시 보이게
          if (intersectionTexts) {
            intersectionTexts.forEach(text => {
              text.style.display = 'flex';
            });
          }
        }
      }
    });
    
    // 0단계: 2초간 대기 (intersection이 보이는 상태로 유지)
    tl.to({}, { duration: 0.5 });
    
    // 1단계: intersection을 3vw로 줄이면서 모든 텍스트가 사라지게
    tl.to(intersection, {
      width: '10vw',
      maxWidth: '58px',
      height: '10vw',
      maxHeight: '58px',
      duration: 0.5,
      ease: 'power2.inOut'
    });
    
    // 모든 텍스트가 사라지게
    if (intersectionTexts) {
      tl.to(intersectionTexts, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          // 애니메이션 완료 후 display: none 적용
          intersectionTexts.forEach(text => {
            text.style.display = 'none';
          });
        }
      }, '-=0.5'); // intersection 축소와 동시에
    }
    
    // 2단계: 각 circle을 최종 위치로 이동
    circles.forEach((circle, index) => {
      const finalPosition = {
        top: circle.classList.contains('trust') ? '0' : 'auto',
        left: circle.classList.contains('trust') ? '50%' : 
              circle.classList.contains('speed') ? '0' : 'auto',
        right: circle.classList.contains('action') ? '0' : 'auto',
        bottom: circle.classList.contains('trust') ? 'auto' : '0',
        transform: circle.classList.contains('trust') ? 'translateX(-50%)' : 'none',
        opacity: 1,
        scale: 1
      };
      
      tl.to(circle, {
        ...finalPosition,
        duration: 0.5,
        ease: 'power2.out',
        delay: index * 0.1
      }, '-=0.3'); // intersection 축소 애니메이션과 겹치도록
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.id === 'venn-animation') {
          t.kill();
        }
      });
    };
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
              <dt><img src="/images/ico_people.svg" alt="임직원 아이콘" /></dt>
              <dd>+ <span className="ani-count" data-count="500">0</span></dd>
            </dl>
          </div>
        </section>

        <section className="about-content content ac-03 company txt-center pin-me">
          <div className="inner">
            <h1 className="ani-up">
              우리는 신차 구매부터<br />
              특장차, 중고차 유통, 중고차 수출, 광고 마케팅까지
            </h1>
            <div className="txt-02 ani-up">
              모든 자동차 유통 과정의 전주기를 통합하여 운영하는 국내에서도 드문 구조의 그룹입니다.
            </div>
            <div className="txt-box">계열사</div>
            <dl className="flex-center">
              <dt><img src="/images/ico_company.svg" alt="회사 아이콘" /></dt>
              <dd>+ <span className="ani-count" data-count="4">0</span></dd>
            </dl>
          </div>
        </section>

        <section className="about-content content ac-06 philosophy txt-center pin-me">
          <div className="inner">
            <h1 className="ani-up">우리의 철학</h1>

            <div className="venn-section">
              <div className="circle intersection">
                <span>Beyond Mobility</span>
                <h2>KS</h2>
              </div>
              <div className="circle trust">
                <span className="fc-s">trust</span>
                <h2>신뢰</h2>
              </div>
              <div className="circle speed">
                <span className="fc-s">speed</span>
                <h2>속도</h2>
              </div>
              <div className="circle action">
                <span className="fc-s">action</span>
                <h2>실행력</h2>
              </div>
            </div>

          </div>
        </section>
        

        <section className="about-content content ac-04 pin-me">
          <div className="inner flex-center">
            <div className="tit-box">
              <img src="/images/ico_marks.png" alt="따옴표 아이콘" />
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
          <h3 className="fc-s ani-txt-up">A New Standard</h3>
          <h1 className="fc-black ani-txt-up">
            <div className="fc-m">우리는 단순히</div>
            차량을 유통하는 기업이 아닌,
          </h1>
          <div className="txt-01 ani-txt-up">
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
