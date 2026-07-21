import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        Назад
      </button>
      <span className={styles.pageInfo}>
        Страница {currentPage} из {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
