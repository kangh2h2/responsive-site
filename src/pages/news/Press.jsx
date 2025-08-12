import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { pressRepo } from '../../repos'; // ← 나중에 한 줄 교체로 API 전환

const ITEMS_PER_PAGE = 2;

function Press() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { items, total } = await pressRepo.list(currentPage, ITEMS_PER_PAGE);
        if (!mounted) return;
        setRows(items || []);
        setTotal(total || 0);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setRows([]);
        setTotal(0);
      }
    })();
    return () => { mounted = false; };
  }, [currentPage]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="press">
      <div className="inner">
        <div className="press-list">
          {rows.length === 0 && (
            <div className="empty">등록된 보도자료가 없습니다.</div>
          )}

          {rows.map((item) => (
            <a
              key={item.id}
              className="flex-center"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.imgSrc ? (
                <img src={item.imgSrc} alt="보도자료 이미지" />
              ) : (
                <div className="img-placeholder">이미지 없음</div>
              )}
              <div className="info-box">
                <div>{item.source}</div>
                <h3>{item.title}</h3>
                <div className="news-data">{(item.date || '').slice(0, 10)}</div>
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