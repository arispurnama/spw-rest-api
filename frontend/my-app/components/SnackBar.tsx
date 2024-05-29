// components/SnackBar.tsx
import { Alert } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";

type SnackBarProps = {
  isOpen?: boolean;
  message?: string;
  type?: string;
  duration?: number; // Duration in milliseconds
  onClose: () => void;
};

const SnackBar: React.FC<SnackBarProps> = ({
  isOpen,
  message,
  type = "info",
  duration = 3000,
  onClose,
}: SnackBarProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isOpen) return null;

  let bgColor = "bg-blue-500";
  if (type === "success") bgColor = "bg-green-500";
  if (type === "error") bgColor = "bg-red-500";

  return (
    <div
      className={`fixed top-5 right-4 p-4 rounded-lg text-white ${bgColor} shadow-lg`}
    >
      <Alert
        onClick={onClose}
        sx={{ width: "100%" }}
        className={`${bgColor}`}
      >
        {message}!!!
      </Alert>
    </div>
  );
};

export default SnackBar;
