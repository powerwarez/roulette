import React, { useState } from 'react';

function PrizeInputModal({ onConfirm, onCancel }) {
  const [items, setItems] = useState(Array(10).fill({ name: '', quantity: 1 }));

  const handleItemChange = (index, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddRow = () => {
    setItems([...items, { name: '', quantity: 1 }]);
  };

  const handleConfirm = () => {
    const validItems = items.filter(
      (item) => item.name && item.quantity > 0
    );
    onConfirm(validItems);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">상품 입력</h2>
        {items.map((item, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="상품 이름"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              className="border p-2 w-2/3"
            />
            <input
              type="number"
              placeholder="수량"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, 'quantity', Number(e.target.value))
              }
              className="border p-2 w-1/3"
            />
          </div>
        ))}
        <button
          onClick={handleAddRow}
          className="bg-green-500 text-white p-2 w-full rounded mb-4"
        >
          품목 추가
        </button>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="bg-gray-400 text-white p-2 rounded">
            취소
          </button>
          <button onClick={handleConfirm} className="bg-blue-500 text-white p-2 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrizeInputModal;