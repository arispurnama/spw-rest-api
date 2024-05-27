// components/SnackBar.tsx
import React, { useEffect } from 'react';
import { useState } from 'react';

type SnackBarProps = {
  message?: string;
  type?: string;
  duration?: number; // Duration in milliseconds
  onClose: () => void;
};

const SnackBar: React.FC<SnackBarProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!show) return null;

  let bgColor = 'bg-blue-500'; // Default to info
  if (type === 'success') bgColor = 'bg-green-500';
  if (type === 'error') bgColor = 'bg-red-500';

  return (
    <div className={`fixed bottom-4  right-4 p-4 rounded-lg text-white ${bgColor} shadow-lg`}>
      {message}
    </div>
  );
};

export default SnackBar;
