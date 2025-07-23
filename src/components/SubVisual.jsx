// components/SubVisual.jsx
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './SubVisual.css';


const SubVisual = ({ title, type = '', bgClass = '' }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    const timer = setTimeout(() => {
      if (el) el.classList.remove('ani-up');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`sub-visual ${type} ${bgClass}`}>
      <div className="inner">
          <ul className="flex-center">
            <li>
              <Link to="/" className="flex-center">
                <img src="/images/ico_home.svg" alt="홈으로"></img>
                <span>home</span>
                <i><img src="/images/ico_arrow_bold.svg" alt=""></img></i>
              </Link>
            </li>
            <li className="ani-hidden"><h1 ref={titleRef} className="ani-up">{title}</h1></li>
          </ul>
      </div>
    </section>
  );
  
};

export default SubVisual;
