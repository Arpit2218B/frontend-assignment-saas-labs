// PaginatedTable.js

import React from 'react';
import usePaginatedData from './usePaginatedData'; // Import custom hook
import './styles.css'; // Custom styles for table, pagination, and shimmer effect

const PaginatedTable = () => {
  const itemsPerPage = 5;
  const {
    currentItems,
    currentPage,
    totalPages,
    loading,
    handlePageChange,
  } = usePaginatedData(itemsPerPage); // Using the custom hook

  return (
    <div className="paginated-table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? // Show shimmer effect while loading
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <tr key={index}>
                  <td className="shimmer-cell"><span className='shimmer'></span></td>
                  <td className="shimmer-cell"><span className='shimmer'></span></td>
                  <td className="shimmer-cell"><span className='shimmer'></span></td>
                </tr>
              ))
            : currentItems.map((project, index) => (
                <tr key={index}>
                  <td>{project['s.no']}</td>
                  <td>{project['percentage.funded']}%</td>
                  <td>{project['amt.pledged'].toLocaleString("en-us", { style: "currency", currency: project?.currency })}</td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Pagination UI */}
      <div className="pagination-ui">
        <select
          className="pagination-dropdown"
          value={currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <span>of</span>
        <span>{totalPages} pages</span>
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>

        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
