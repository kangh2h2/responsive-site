import { NavLink, Routes, Route } from 'react-router-dom';
import Rentcar from './business/Rentcar';
import Purchase from './business/Purchase';
import Export from './business/Export';
import Ads from './business/Ads';

const Business = () => {
  return (
    <>
      <nav className="tab-menu">
        <NavLink to="rentcar">자동차 금융 컨설팅</NavLink>
        <NavLink to="purchase">전국매입</NavLink>
        <NavLink to="export">해외수출</NavLink>
        <NavLink to="ads">광고마케팅</NavLink>
      </nav>

      <Routes>
        <Route index element={<Rentcar />} />
        <Route path="rentcar" element={<Rentcar />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="export" element={<Export />} />
        <Route path="ads" element={<Ads />} />
      </Routes>
    </>
  );
};

export default Business;
