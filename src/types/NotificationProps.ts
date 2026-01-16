export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'confirm';


export interface NotificationProps {
  type: NotificationType;        
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  autoClose?: boolean;
  duration?: number;
}


export interface NotificationState {
  isOpen: boolean;              
  type: NotificationType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}