import { useState, useEffect } from 'react';
import { fetchUsers } from '../../../entities/user/api/fetchUsers';

export const useTable = (itemsPerPage = 10) => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterString, setFilterString] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    setCurrentPage(1);
  }, [filterString, sortConfig.key, sortConfig.direction]);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const skip = (currentPage - 1) * itemsPerPage;
        const result = await fetchUsers({
          limit: itemsPerPage,
          skip,
          sortBy: sortConfig.key,
          order: sortConfig.direction,
          searchQuery: filterString
        });
        
        if (isMounted) {
          setData(result.users);
          setTotalItems(result.total);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Не удалось загрузить данные пользователей. Пожалуйста, попробуйте позже.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      loadData();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [currentPage, itemsPerPage, sortConfig.key, sortConfig.direction, filterString]);

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') direction = null;
    }
    setSortConfig({ key: direction ? key : null, direction });
  };

  return {
    data,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
    filterString,
    setFilterString,
    sortConfig,
    handleSort
  };
};
