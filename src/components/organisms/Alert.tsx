import React from 'react';

interface AlertProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

const Alert: React.FC<AlertProps> = ({ isVisible, onClose, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <p className="mb-4 text-lg">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
