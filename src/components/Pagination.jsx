import PropTypes from 'prop-types';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    
    return (
    <div className="pagination">
        <button
            className="page-button prev"
            onClick={handlePrevious}
            disabled={currentPage === 1}
        >
            <img src="/images/ico_prev.svg" alt="이전페이지"></img>
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
            <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => onPageChange(index + 1)}
            >
                {index + 1}
            </button>
        ))}

        <button
            className="page-button next"
            onClick={handleNext}
            disabled={currentPage === totalPages}
        >
            <img src="/images/ico_next.svg" alt="다음페이지"></img>
        </button>
    </div>
  );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;