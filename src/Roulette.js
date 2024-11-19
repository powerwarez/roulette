import React, { useState } from 'react';
import RouletteWheel from './RouletteWheel';
import PrizeModal from './PrizeModal';

function Roulette({ prizes, onPrizeRemove }) {
  const [selectedPrize, setSelectedPrize] = useState(null);

  const handleConfirmPrize = () => {
    if (selectedPrize) {
      console.log(`Confirming prize: ${selectedPrize}`);
      onPrizeRemove(selectedPrize);
      setSelectedPrize(null);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center mt-20">
      {/* CSS로 정의된 삼각형 포인터가 사용됩니다 */}
      <div className="roulette-pointer"></div>

      <RouletteWheel
        prizes={prizes}
        onPrizeSelected={(prize) => {
          console.log(`Prize selected: ${prize}`);
          setSelectedPrize(prize);
        }}
      />

      {selectedPrize && (
        <>
          <PrizeModal
            prize={selectedPrize}
            onConfirm={handleConfirmPrize}
            onClose={() => {
              console.log('Closing modal.');
              setSelectedPrize(null);
            }}
          />
          {console.log(`Rendering PrizeModal with prize: ${selectedPrize}`)}
        </>
      )}
    </div>
  );
}

export default Roulette;