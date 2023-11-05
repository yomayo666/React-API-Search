import React from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchTerm: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link to={`/search/${currentPage - 1}`}>&lt; Previous</Link>
      )}
      {currentPage < totalPages && (
        <Link to={`/search/${currentPage + 1}`}>Next &gt;</Link>
      )}
    </div>
  );
};

export default Pagination;
