import React, { useState } from 'react';
import Pagination from '../../components/Pagination';

const pressData = [
    {
      id: 1,
      href: "https://www.globalepic.co.kr/view.php?ud=20250609123607406848439a4874_29",
      imgSrc: "https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?pp=002&idx=3&simg=202506091236220393448439a4874112222163195.jpg&nmt=29",
      source: "글로벌에픽",
      title: "KS오토플랜, 청년 미래 응원 위해 아울디자인 박치은 대표 초청 특별 강연회 성료",
      date: "2025-06-09",
    },
    // 추가 데이터...
];

function Press() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pressData.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(pressData.length / itemsPerPage);
  
    return (
        <div className="press">
            <div className="inner">
                <div className="press-list">
                    {currentItems.map((item) => (
                        <a
                            key={item.id}
                            className="flex-center"
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={item.imgSrc} alt="보도자료 이미지"></img>
                            <div className="info-box">
                                <div>{item.source}</div>
                                <h3>{item.title}</h3>
                                <div className="news-data">{item.date}</div>
                            </div>
                        </a>
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default Press;
