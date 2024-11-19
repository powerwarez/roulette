import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Roulette from './Roulette';
import ProductListCard from './ProductListCard';
import PrizeInputModal from './PrizeInputModal';

function App() {
  const [prizes, setPrizes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedPrizes = localStorage.getItem('roulettePrizes');
    if (savedPrizes) {
      setPrizes(JSON.parse(savedPrizes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('roulettePrizes', JSON.stringify(prizes));
  }, [prizes]);

  const handleRemovePrize = (selectedPrize) => {
    setPrizes(prevPrizes => {
      const [selectedName] = selectedPrize.split(' ');
      
      const prizeMap = prevPrizes.reduce((map, prize) => {
        const [name, quantityStr] = prize.split(' ');
        const quantity = parseInt(quantityStr) || 1;
        map.set(name, (map.get(name) || 0) + quantity);
        return map;
      }, new Map());

      if (prizeMap.has(selectedName)) {
        const currentQuantity = prizeMap.get(selectedName);
        if (currentQuantity > 1) {
          prizeMap.set(selectedName, currentQuantity - 1);
        } else {
          prizeMap.delete(selectedName);
        }
      }

      const updatedPrizes = Array.from(prizeMap.entries()).map(([name, quantity]) => `${name} ${quantity}개`);
      return updatedPrizes;
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmPrizes = (newPrizes) => {
    // 새로운 상품 목록으로 직접 설정
    const formattedPrizes = newPrizes
      .filter(prize => prize.name && prize.quantity > 0)
      .map(prize => `${prize.name} ${prize.quantity}개`);
    
    setPrizes(formattedPrizes);
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="mt-4 mb-4 text-3xl font-bold text-center">룰렛 프로그램</h1>
      
      <div className="flex flex-col items-center justify-center flex-grow">
        <Roulette prizes={prizes} onPrizeRemove={handleRemovePrize} />
        
        <ProductListCard prizes={prizes} />
      </div>

      <button
        onClick={handleOpenModal}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
        title="상품 입력하기"
      >
        <Plus size={24} />
      </button>

      {isModalOpen && (
        <PrizeInputModal
          onConfirm={handleConfirmPrizes}
          onCancel={handleCloseModal}
          existingPrizes={prizes}
        />
      )}
    </div>
  );
}

export default App;