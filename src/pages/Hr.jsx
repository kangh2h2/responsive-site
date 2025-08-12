import './Hr.css';
import { NavLink, Routes, Route, Navigate, useMatch } from 'react-router-dom';
import Info from './hr/Info';
import List from './hr/List';
import Detail from './hr/Detail';
import SubVisual from "../components/SubVisual";

export default function Hr() {
    const isDetail = useMatch('/hr/detail/:id');

    return (
        <>
            <SubVisual title="채용" type="hr" bgClass="bg-hr sub-board" />

            <nav className="tab-menu">
                <div className="inner">
                    <NavLink to="info" className={({ isActive }) => (isActive ? "active" : undefined)}>채용정보</NavLink>
                    <NavLink
                        to="list"
                        className={({ isActive }) => (isActive || isDetail ? 'active' : undefined)}
                    >
                        채용공고
                    </NavLink>
                </div>
            </nav>

            <Routes>
                <Route index element={<Navigate to="info" replace />} />
                <Route path="info" element={<Info />} />
                <Route path="list" element={<List />} />
                <Route path="detail/:id" element={<Detail />} />
            </Routes>
        </>
    );
}
