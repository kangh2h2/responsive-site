import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollFadeIn = (selector = '.ani-up') => {
  useEffect(() => {
    const targets = document.querySelectorAll(selector);
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.3, // ✅ 여기! 0.2초씩 순차 실행
        scrollTrigger: {
          trigger: targets[0], // 트리거 기준 하나만 설정
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [selector]);
};

export default useScrollFadeIn;
