import React, { useState } from 'react';
import Pagination from '../../components/Pagination';

const prData = [
    {
      id: 1,
      href: "https://www.youtube.com//embed/en5yw8FTRxw?si=QOcw9pzjgn8IYpBE",
      title: "KS오토플랜 송도 2지점 개업식 스케치",
      date: "2024-05-10",
    },
    // 추가 데이터...
];

function Pr() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prData.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(prData.length / itemsPerPage);
    
    return (
        <div className="pr">
            <div className="inner">
                <div className="pr-list">

                    {currentItems.map((item) => (
                    <div className="pr-box">
                        <div className="pr-youtube">
                            <iframe
                                src={item.href}
                                title={item.title}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <a
                            key={item.id}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            <h3>{item.title}</h3>
                            <div className="news-data">{item.date}</div>
                        </a>

                    </div>
                    ))}
                    
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default Pr
