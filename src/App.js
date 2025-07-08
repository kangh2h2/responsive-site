
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './hooks/useScrollTop';

import Main from './pages/Main';
import About from './pages/About';
import Business from './pages/Business';
import News from './pages/News';
import Hr from './pages/Hr';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/business/*" element={<Business />} />
        <Route path="/news" element={<News />} />
        <Route path="/hr" element={<Hr />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


export default App;
