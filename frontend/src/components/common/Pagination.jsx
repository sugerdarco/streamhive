import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({ page, hasMore, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>
      <span className="pagination-indicator">Page {page}</span>
      <button
        className="pagination-btn"
        disabled={!hasMore}
        onClick={() => onPageChange(page + 1)}
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
