// src/organisms/MessageModal.tsx
import React from 'react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal; // default export 사용
