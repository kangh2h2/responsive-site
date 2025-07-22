import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useScrollEffect from '../hooks/useScrollEffect';

const ScrollManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useScrollEffect({ deps: [pathname] });

  return null;
};

export default ScrollManager;