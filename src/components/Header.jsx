import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './Header.css';


const menuItems = [
    { name: 'KS소개', path: '/about' },
    { name: '사업분야', path: '/business' },
    { name: '뉴스룸', path: '/news' },
    { name: '채용', path: '/hr' }
];

const Header = () => {
  const [isMobile, setIsMobile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleTopClick = () => {
    gsap.killTweensOf(window);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 스크롤이 0이 된 후에만 resetAnimations 이벤트 발생
    const checkScroll = () => {
      if (window.scrollY === 0) {
        window.dispatchEvent(new Event('resetAnimations'));
        window.removeEventListener('scroll', checkScroll);
      }
    };
    window.addEventListener('scroll', checkScroll);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
  
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
  
    // 최초 실행
    handleResize();
    handleScroll();
  
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
  
    // 클린업: 한 번에 모두 제거
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  const Menu = () => (
    <ul className='flex-center'>
      {menuItems.map((item, idx) => (
        <li key={idx}>
            <Link to={item.path} onClick={() => setMenuOpen(false)}
              className={item.name === "채용" ? 'bg-m' : ''}>
                {item.name}
            </Link>
        </li>
      ))}
    </ul>
  );

  const currentMenu = menuItems.find(item => location.pathname.startsWith(item.path));
  const isRecruitOrNews = currentMenu && (currentMenu.name === '채용' || currentMenu.name === '뉴스룸');

  if (isMobile === null) return null; // 렌더 보호

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${isRecruitOrNews ? 'navy' : ''}`}>
      <nav className={isMobile ? 'mobile-nav inner' : 'desktop-nav inner flex-center'}>
        <Link to="/" className="logo"><img className="img-responsive" src='/images/logo.svg' alt="로고"></img></Link>
        {isMobile ? (
          <button
            className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
            onClick={handleMenuToggle}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            >
            <span></span>
            <span></span>
            <span></span>
        </button>
        
        ) : (
          <div className="menu"><Menu /></div>
        )}
      </nav>

      
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Menu />
      </div>


      <button className="btn-to-top" onClick={handleTopClick}>
        ↑
      </button>
      
    </header>

    
  );
};

export default Header;
