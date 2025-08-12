import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { prRepo } from '../../repos';

const ITEMS_PER_PAGE = 9;

export default function Pr() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  useEffect(() => {
    prRepo.list(currentPage, ITEMS_PER_PAGE).then(({ items, total }) => {
      setRows(items);
      setTotal(total);
    });
  }, [currentPage]);

  return (
    <div className="pr">
      <div className="inner">
        <div className="pr-list">
          {rows.map(item => (
            <div className="pr-box" key={item.id}>
              <div className="pr-youtube">
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}`}
                  title={item.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <a href={`https://www.youtube.com/watch?v=${item.youtubeId}`} target="_blank" rel="noopener noreferrer">
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
  );
}
