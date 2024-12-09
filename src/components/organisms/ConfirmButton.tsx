import React, { useState } from 'react';

type ConfirmButtonProps = {
  onConfirm: () => void;
  buttonLabel: string;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onConfirm, buttonLabel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={openModal}
      >
        {buttonLabel}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-4 text-lg">저장하시겠습니까?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={closeModal}
              >
                취소
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmButton;
