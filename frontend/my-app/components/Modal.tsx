import React from "react";

const Modal = ( isOpen?:any, onClose?:any, children?:any ) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        <button onClick={onClose} className="absolute top-4 right-4">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
