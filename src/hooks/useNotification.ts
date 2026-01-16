import { useState } from 'react';
import {type NotificationType, type NotificationState } from '../types/NotificationProps';


export const useNotification = () => {

  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,       
    type: 'info',        
    title: '',            
    message: ''         
  });

 
  const showNotification = (
    type: NotificationType,           
    title: string,
    message: string,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    
    setNotification({
      isOpen: true,
      type,
      title,
      message,
      onConfirm,
      onCancel
    });
  };

  const closeNotification = () => {

    setNotification(prev => ({
      ...prev,
      isOpen: false
    }));
  };


  return {
    notification,
    showNotification,
    closeNotification
  };
};