import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NotificationToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000,
  onClose 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white border-green-600';
      case 'info':
        return 'bg-roblox-blue text-white border-blue-600';
      case 'warning':
        return 'bg-yellow-500 text-white border-yellow-600';
      case 'error':
        return 'bg-red-500 text-white border-red-600';
      default:
        return 'bg-green-500 text-white border-green-600';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Icon name="CheckCircle" size={20} />;
      case 'info':
        return <Icon name="Info" size={20} />;
      case 'warning':
        return <Icon name="AlertTriangle" size={20} />;
      case 'error':
        return <Icon name="XCircle" size={20} />;
      default:
        return <Icon name="CheckCircle" size={20} />;
    }
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 
        transform transition-all duration-300 ease-out
        ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className={`
        flex items-center space-x-3 p-4 rounded-xl shadow-2xl border-2
        ${getTypeStyles()}
        animate-scale-in
        backdrop-blur-sm
      `}>
        {getIcon()}
        <span className="font-medium">{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          className="ml-2 hover:opacity-80 transition-opacity"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;