import './Hr.css';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Info from './hr/Info';
import List from './hr/List';

import SubVisual from "../components/SubVisual";

const Hr = () => {
  return (
    <>
      <SubVisual title="채용" type="hr" bgClass="bg-hr sub-board" />

      <nav className="tab-menu">
        <div className="inner">
          <NavLink to="info" className={ ({isActive}) => (isActive ? "active" : undefined) }>채용정보</NavLink>
          <NavLink to="list" className={ ({isActive}) => (isActive ? "active" : undefined) }>채용공고</NavLink>
        </div>
      </nav>

      <Routes>
        <Route index element={<Navigate to="info" replace />} />
        <Route path="info" element={<Info />} />
        <Route path="list" element={<List />} />
      </Routes>
    </>
  );
};

export default Hr;
