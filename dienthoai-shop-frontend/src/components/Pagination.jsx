import React from "react";
import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={styles.pageLink}
          >
            Trước
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? styles.active : ""}
          >
            <button
              onClick={() => onPageChange(number)}
              className={styles.pageLink}
            >
              {number + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={styles.pageLink}
          >
            Sau
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
