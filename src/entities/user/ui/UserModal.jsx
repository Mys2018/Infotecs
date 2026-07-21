import React from 'react';
import Modal from '../../../shared/ui/Modal/Modal';
import styles from './UserModal.module.css';

const UserModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  const fullName = `${user.lastName || ''} ${user.firstName || ''} ${user.maidenName || ''}`.trim();
  const address = user.address ? `${user.address.country || ''}, ${user.address.city || ''}, ${user.address.address || ''}`.trim() : 'Не указан';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          {user.image && (
            <img src={user.image} alt={fullName} className={styles.avatar} />
          )}
          <h2 className={styles.name}>{fullName}</h2>
        </div>
        
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Возраст:</span>
            <span className={styles.value}>{user.age} лет</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Рост:</span>
            <span className={styles.value}>{user.height} см</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Вес:</span>
            <span className={styles.value}>{user.weight} кг</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Телефон:</span>
            <span className={styles.value}>{user.phone}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{user.email}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Адрес:</span>
            <span className={styles.value}>{address}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
