// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        // 페이지 이동할 때 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null; // 렌더링할 UI 없음
};

export default ScrollToTop;
