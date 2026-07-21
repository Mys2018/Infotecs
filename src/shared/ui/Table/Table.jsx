import React, { useRef } from 'react';
import styles from './Table.module.css';

const Table = ({ columns, data, onRowClick, sortConfig, onSort }) => {
  const tableRef = useRef(null);

  const handleResizeStart = (e, colIndex) => {
    e.preventDefault();
    e.stopPropagation();

    const th = e.target.parentElement;
    const nextTh = th.nextElementSibling;
    
    if (!nextTh) return;

    const startX = e.pageX;
    const startWidth = th.offsetWidth;
    const nextStartWidth = nextTh.offsetWidth;

    const widthColumn = 50;

    const handleMouseMove = (moveEvent) => {
      const delta = moveEvent.pageX - startX;
      
      let newWidth = startWidth + delta;
      let newNextWidth = nextStartWidth - delta;

      if (newWidth < widthColumn) {
        newWidth = widthColumn;
        newNextWidth = nextStartWidth + (startWidth - widthColumn);
      } else if (newNextWidth < widthColumn) {
        newNextWidth = widthColumn;
        newWidth = startWidth + (nextStartWidth - widthColumn);
      }

      th.style.width = `${newWidth}px`;
      nextTh.style.width = `${newNextWidth}px`;
      
      document.body.style.userSelect = 'none';
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'unset';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={styles.tableContainer}>
      <table ref={tableRef} className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={col.key}>
                <div 
                  className={styles.thContent}
                  onClick={() => col.sortable && onSort && onSort(col.key)}
                  style={{ cursor: col.sortable ? 'pointer' : 'default' }}
                >
                  <span className={styles.thLabel}>{col.label}</span>
                  {col.sortable && sortConfig?.key === col.key && (
                    <span className={styles.sortIndicator}>
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </div>
                {index < columns.length - 1 && (
                  <div
                    className={styles.resizer}
                    onMouseDown={(e) => handleResizeStart(e, index)}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyState}>
                Нет данных для отображения
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={row.id || rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? styles.clickableRow : ''}
              >
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
