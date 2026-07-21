import React from 'react';
import styles from './MainPage.module.css';
import UserTableWidget from '../../widgets/UserTable/UserTableWidget';

const MainPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Тестовое задание</h1>
      </header>
      <main className={styles.main}>
        <UserTableWidget />
      </main>
    </div>
  );
};

export default MainPage;
