import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollEffect = ({ fadeSelector = '.ani-up' } = {}) => {
  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const groups = document.querySelectorAll('section'); // ani-up을 감싸는 부모 그룹 기준

    groups.forEach((group) => {
      const targets = group.querySelectorAll(fadeSelector); // 예: .ani-up 여러 개
      if (targets.length) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 50%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [fadeSelector]);
};

export default useScrollEffect;
