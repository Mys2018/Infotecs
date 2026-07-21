import React, { useState } from 'react';
import { fetchUsers } from '../../entities/user/api/fetchUsers';
import { useTable } from '../../features/table/hooks/useTable';
import Pagination from '../../features/pagination/ui/Pagination';
import Table from '../../shared/ui/Table/Table';
import UserModal from '../../entities/user/ui/UserModal';
import styles from './UserTableWidget.module.css';

const UserTableWidget = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: tableData,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
    filterString,
    setFilterString,
    sortConfig,
    handleSort
  } = useTable(10);

  const columns = [
    { key: 'lastName', label: 'Фамилия', sortable: true, render: (row) => row.lastName || '-' },
    { key: 'firstName', label: 'Имя', sortable: true, render: (row) => row.firstName || '-' },
    { key: 'maidenName', label: 'Отчество', sortable: true, render: (row) => row.maidenName || '-' },
    { key: 'age', label: 'Возраст', sortable: true },
    { key: 'gender', label: 'Пол', sortable: true },
    { key: 'phone', label: 'Телефон', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'country', label: 'Страна', render: (row) => row.address?.country || '-' },
    { key: 'city', label: 'Город', render: (row) => row.address?.city || '-' },
  ];

  if (loading) return <div className={styles.loader}>Загрузка...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.widget}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Поиск по таблице..."
          value={filterString}
          onChange={(e) => setFilterString(e.target.value)}
          className={styles.filterInput}
        />
      </div>

      <Table
        columns={columns}
        data={tableData}
        onSort={handleSort}
        sortConfig={sortConfig}
        onRowClick={setSelectedUser}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <UserModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserTableWidget;
