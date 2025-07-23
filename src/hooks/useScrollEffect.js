// useScrollEffect.jsx
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const useScrollEffect = ({
  fadeSelector = '.ani-up',
  downSelector = '.ani-down',
  leftSelector = '.ani-left',
  rightSelector = '.ani-right',
  scaleSelector = '.ani-scale',
  xscaleSelector = '.ani-xscale',
  yoyoSelector = '.ani-yoyo',
  countSelector = '.ani-count',
  deps = [],
} = {}) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const groups = document.querySelectorAll('section');

    groups.forEach((group) => {
      const upTargets = group.querySelectorAll(fadeSelector);
      if (upTargets.length) {
        gsap.set(upTargets, { opacity: 0, y: 50 });
        gsap.fromTo(
          upTargets,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 60%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }

      const downTargets = group.querySelectorAll(downSelector);
      if (downTargets.length) {
        gsap.set(downTargets, { opacity: 0, y: -50 });
        gsap.fromTo(
          downTargets,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 60%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }

      const leftTargets = group.querySelectorAll(leftSelector);
      if (leftTargets.length) {
        gsap.set(leftTargets, { opacity: 0, x: 100 });
        gsap.fromTo(
          leftTargets,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 60%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }

      const rightTargets = group.querySelectorAll(rightSelector);
      if (rightTargets.length) {
        gsap.set(rightTargets, { opacity: 0, x: -100 });
        gsap.fromTo(
          rightTargets,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 60%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }

      const scaleTargets = group.querySelectorAll(scaleSelector);
      if (scaleTargets.length) {
        scaleTargets.forEach((el) => {
          el.style.transformOrigin = 'top left';
        });
        gsap.set(scaleTargets, { opacity: 0, scale: 0.5 });
        gsap.fromTo(
          scaleTargets,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 60%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }


      const xscaleTargets = group.querySelectorAll(xscaleSelector);
      if (xscaleTargets.length) {
        xscaleTargets.forEach((el) => {
          gsap.set(el, { width: '0%', opacity: 0 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: group,
              start: 'top 50%',
              toggleActions: 'play none none reset',
            },
          });

          // 1. xscale 확장 애니메이션
          tl.fromTo(
            el,
            { width: '0%', opacity: 0 },
            {
              width: '100%',
              opacity: 1,
              duration: 1.5,
              ease: 'power2.out',
            }
          );

          // 2. 내부 tit 요소 순차 애니메이션
          const titEls = el.querySelectorAll('.tit');
          titEls.forEach((tit) => {
            gsap.set(tit, { opacity: 0, y: 30 });
            tl.fromTo(
              tit,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
              },
              '-=1' // 앞 요소 애니메이션 이후 약간의 간격으로 실행
            );
          });
        });
      }

      const yoyoTargets = group.querySelectorAll(yoyoSelector);
      if (yoyoTargets.length) {
        gsap.set(yoyoTargets, { y: 0 });
        gsap.fromTo(
          yoyoTargets,
          { y: 0 },
          {
            y: -15,
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: 'sine.inOut',
            scrollTrigger: {
              trigger: group,
              start: 'top 60%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }

      const countTargets = group.querySelectorAll(countSelector);
      if (countTargets.length) {
        countTargets.forEach((el) => {
          const finalValue = parseInt(el.dataset.count, 10);
          if (!isNaN(finalValue)) {
            el.textContent = '0';
            const obj = { val: 0 };
            gsap.to(obj, {
              val: finalValue,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 60%',
                toggleActions: 'play none none reset',
              },
              onUpdate: () => {
                el.textContent = Math.floor(obj.val).toLocaleString();
              },
            });
          }
        });
      }
    
    });
      

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [fadeSelector, downSelector, leftSelector, rightSelector, scaleSelector, xscaleSelector, yoyoSelector, countSelector, pathname, deps]);
};

export default useScrollEffect;
