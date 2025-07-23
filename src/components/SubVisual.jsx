// components/SubVisual.jsx
import { Link } from 'react-router-dom';
import './SubVisual.css';


const SubVisual = ({ title, type = '', bgClass = '' }) => {
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
            <li className="ani-hidden"><h1 className="ani-up-sub">{title}</h1></li>
          </ul>
      </div>
    </section>
  );
  
};

export default SubVisual;
