import './News.css';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Pr from './news/Pr';
import Press from './news/Press';

import SubVisual from "../components/SubVisual";

const News = () => {
  return (
    <>
      <SubVisual title="뉴스룸" type="news" bgClass="bg-news sub-board" />

      <nav className="tab-menu">
        <div className="inner">
          <NavLink to="pr" className={ ({isActive}) => (isActive ? "active" : undefined) }>홍보영상</NavLink>
          <NavLink to="press" className={ ({isActive}) => (isActive ? "active" : undefined) }>보도자료</NavLink>
        </div>
      </nav>

      <Routes>
        <Route index element={<Navigate to="pr" replace />} />
        <Route path="pr" element={<Pr />} />
        <Route path="press" element={<Press />} />
      </Routes>
    </>
  );
};

export default News;
