import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const useScrollEffect = ({
  fadeSelector = '.ani-up',
  snapSelector = '.pin-me',
} = {}) => {
  useLayoutEffect(() => {
    // 기존 ScrollTrigger 전부 제거
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // ✅ 페이드 인 애니메이션 처리
    const fadeTargets = Array.from(document.querySelectorAll(fadeSelector));

    fadeTargets.forEach((target) => {
      if (document.body.contains(target)) {
        gsap.fromTo(
          target,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 80%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }
    });

    // ✅ 섹션 스냅 이동 처리
    const snapPanels = gsap.utils.toArray(snapSelector);

    function goToSection(snapPanel) {
        gsap.to(window, {
            scrollTo: { y: snapPanel, autoKill: false },
            duration: 0, // 스크롤 애니메이션 시간 설정
            ease: "power2.out",
        });
    }

    // 스냅 동작 설정
    snapPanels.forEach((snapPanel) => {
        ScrollTrigger.create({
        trigger: snapPanel,
        onEnter: () => goToSection(snapPanel),
        onEnterBack: () => goToSection(snapPanel),
        });
    });


    
 

    // ✅ 정리
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [fadeSelector, snapSelector]);
};

export default useScrollEffect;