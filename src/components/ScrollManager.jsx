import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useScrollEffect from '../hooks/useScrollEffect';

const ScrollManager = () => {
  const { pathname } = useLocation();
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const handleReset = () => setResetKey((prev) => prev + 1);
    window.addEventListener('resetAnimations', handleReset);
    return () => window.removeEventListener('resetAnimations', handleReset);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useScrollEffect({ deps: [resetKey] });

  return null;
};

export default ScrollManager;