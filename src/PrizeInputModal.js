import React, { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

function PrizeInputModal({ onConfirm, onCancel, existingPrizes }) {
  const [items, setItems] = useState([{ name: '', quantity: 1 }]);

  // 컴포넌트 마운트 시 기존 상품 정보 로드
  useEffect(() => {
    if (existingPrizes && existingPrizes.length > 0) {
      const existingItems = existingPrizes.map(prize => {
        const [name, quantityStr] = prize.split(' ');
        return {
          name,
          quantity: parseInt(quantityStr) || 1
        };
      });
      setItems(existingItems);
    }
  }, [existingPrizes]);

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

  const handleDeleteRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    const validItems = items.filter(
      (item) => item.name && item.quantity > 0
    );
    onConfirm(validItems);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">상품 입력</h2>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <span className="text-gray-600 w-6">{index + 1}.</span>
            <div className="flex-grow flex items-center space-x-2">
              <input
                type="text"
                placeholder="상품 이름"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                className="border p-2 flex-grow rounded"
              />
              <input
                type="number"
                min="1"
                placeholder="수량"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, 'quantity', Number(e.target.value))
                }
                className="border p-2 w-20 rounded"
              />
            </div>
            <button
              onClick={() => handleDeleteRow(index)}
              className="p-1 text-red-500 hover:text-red-700"
              title="삭제"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <div className="flex flex-col space-y-4 pt-4 mt-4 border-t">
          <button
            onClick={handleAddRow}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>상품 추가하기</span>
          </button>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrizeInputModal;