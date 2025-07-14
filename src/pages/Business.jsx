import './Business.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Rentcar from './business/Rentcar';
import Purchase from './business/Purchase';
import Export from './business/Export';
import Ads from './business/Ads';

import SubVisual from "../components/SubVisual";

const Business = () => {
  return (
    <>
      <SubVisual title="사업분야" type="business" bgClass="bg-business" />
      
      <nav className="tab-menu">
        <div className="inner">
          <NavLink to="rentcar" className={ ({isActive}) => (isActive ? "active" : undefined) }>자동차 금융 컨설팅</NavLink>
          <NavLink to="purchase" className={ ({isActive}) => (isActive ? "active" : undefined) }>전국매입</NavLink>
          <NavLink to="export" className={ ({isActive}) => (isActive ? "active" : undefined) }>해외수출</NavLink>
          <NavLink to="ads" className={ ({isActive}) => (isActive ? "active" : undefined) }>광고마케팅</NavLink>
        </div>
        
      </nav>

      <Routes>
        <Route path="rentcar" element={<Rentcar />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="export" element={<Export />} />
        <Route path="ads" element={<Ads />} />
      </Routes>
    </>
  );
};

export default Business;
