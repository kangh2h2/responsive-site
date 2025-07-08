import { NavLink, Routes, Route } from 'react-router-dom';
import Info from './hr/Info';
import List from './hr/List';

const Hr = () => {
  return (
    <>
      <nav className="tab-menu">
        <NavLink to="info">자동차 금융 컨설팅</NavLink>
        <NavLink to="list">전국매입</NavLink>
      </nav>

      <Routes>
        <Route index element={<Info />} />
        <Route path="info" element={<Info />} />
        <Route path="list" element={<List />} />
      </Routes>
    </>
  );
};

export default Hr;
