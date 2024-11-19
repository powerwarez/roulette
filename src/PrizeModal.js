import React from 'react';

function PrizeModal({ prize, onConfirm, onClose }) {
  // 상품명만 추출 (예: "볼펜 10개" -> "볼펜")
  const prizeName = prize.split(' ')[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg text-center w-64">
        <h2 className="text-3xl font-bold mb-4">{prizeName}</h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            확인
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrizeModal;