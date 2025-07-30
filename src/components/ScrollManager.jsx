import { useEffect, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import useScrollEffect from '../hooks/useScrollEffect';

export const ResetKeyContext = createContext(0);

const ScrollManager = ({ children }) => {
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

  return (
    <ResetKeyContext.Provider value={resetKey}>
      {children}
    </ResetKeyContext.Provider>
  );
};

export default ScrollManager;