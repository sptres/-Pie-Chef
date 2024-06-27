import React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">
          Are you sure you want to delete this recipe? <br />
          This action cannot be undone.
        </h2>
        <div className="flex justify-end">
          <button onClick={onClose} className="btn bg-gray-200 text-black mr-2">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn bg-red-500 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
