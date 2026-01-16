import React, { useEffect } from 'react';
import { type NotificationProps } from '../types/NotificationProps';
import { notificationIcons, CloseIcon } from './icons';
import styles from './Notification.module.scss';

export const Notification: React.FC<NotificationProps> = ({
  type,                         
  title,
  message,
  isOpen,
  onClose,
  autoClose = true,              
  duration = 3000                
}) => {

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();  
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, duration, onClose]); 

  if (!isOpen) return null;

  return (
    <div className={`${styles.notification} ${styles[`notification--${type}`]}`}>
      <div className={styles.notificationContent}>
        <div className={styles.notificationIcon}>
          {notificationIcons[type]}
        </div>

        <div className={styles.notificationText}>
          <h3 className={styles.notificationTitle}>{title}</h3>
          <p className={styles.notificationMessage}>{message}</p>
        </div>

        <button 
          className={styles.notificationClose}
          onClick={onClose}
          aria-label="Închide"
        >
          <CloseIcon />
        </button>
      </div>
 
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};