import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-secondary',
    error: 'bg-primary',
    info: 'bg-gray-800',
  }[type];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg max-w-sm`}>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
