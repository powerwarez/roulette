import React from 'react';

function ProductListCard({ prizes }) {
    if (!prizes || prizes.length === 0) {
      return (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-64 max-h-64 overflow-y-auto">
          <h2 className="text-xl font-bold mb-2">남은 상품</h2>
          <p className="text-gray-500">상품이 없습니다.</p>
        </div>
      );
    }
  
    // 상품명과 수량을 분리하여 통합
    const prizeCounts = prizes.reduce((acc, prize) => {
      const [name, quantityStr] = prize.split(' ');
      const quantity = parseInt(quantityStr) || 1;
      
      if (!acc[name]) {
        acc[name] = quantity;
      }
      return acc;
    }, {});
  
    return (
      <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-64 max-h-64 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">남은 상품</h2>
        {Object.entries(prizeCounts).map(([name, count]) => (
          <div key={name} className="flex justify-between mb-1">
            <span className="text-gray-700">{name}</span>
            <span className="text-gray-900 font-semibold">{count}개</span>
          </div>
        ))}
      </div>
    );
  }
  
  export default ProductListCard;