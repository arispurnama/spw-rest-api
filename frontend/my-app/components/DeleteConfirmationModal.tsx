"use client";
import React from 'react';

const DeleteConfirmationModal = (open?:any, handleClose?:any, handleConfirm?:any ) => {
  console.log('open', handleConfirm)
  if (!open.open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full z-10">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Konfirmasi Hapus</h2>
        </div>
        <div className="p-4">
          <p>Apakah Anda yakin ingin menghapus item ini?</p>
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Batal
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            onClick={handleConfirm}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
