import React from 'react';

function SpinButton({ prizes, rotation, setRotation, onPrizeSelected, prizeRatios }) {
  const handleSpin = () => {
    if (prizes.length === 0) return;

    const now = new Date();
    const randomMultiplier = 1 + (now.getTime() % 500) / 1000;

    // 상품이 1개인 경우 바로 선택
    if (prizes.length === 1 || prizeRatios.length === 1) {
      const selectedPrize = prizeRatios[0];
      const extraRotations = 5 * 360;
      const targetRotation = 360; // 한 바퀴 돌고 0도에 정확히 멈추도록

      let speed = 20 * randomMultiplier;
      let currentAngle = rotation + extraRotations + targetRotation;

      const spinAnimation = setInterval(() => {
        currentAngle += speed;
        speed *= 0.98;
        setRotation(currentAngle);

        if (speed < 0.1) {
          clearInterval(spinAnimation);
          if (onPrizeSelected) {
            onPrizeSelected(prizes[0]); // 첫 번째(유일한) 상품 선택
          }
        }
      }, 16);
      return;
    }

    // 여러 상품이 있는 경우 기존 로직
    const randomValue = Math.random();
    let selectedPrize = prizeRatios[0];
    let accumulatedRatio = 0;

    for (const prize of prizeRatios) {
      accumulatedRatio += prize.ratio;
      if (randomValue <= accumulatedRatio) {
        selectedPrize = prize;
        break;
      }
    }

    const extraRotations = 5 * 360;
    const middleAngle = (selectedPrize.endAngle + selectedPrize.startAngle) / 2;
    const targetRotation = 360 - middleAngle;

    let speed = 20 * randomMultiplier;
    let currentAngle = rotation + extraRotations + targetRotation;

    const spinAnimation = setInterval(() => {
      currentAngle += speed;
      speed *= 0.98;
      setRotation(currentAngle);

      if (speed < 0.1) {
        clearInterval(spinAnimation);
        
        const finalRotation = currentAngle % 360;
        let selectedPrizeName = null;
        
        for (const prize of prizeRatios) {
          const startAngle = (prize.startAngle + finalRotation) % 360;
          const endAngle = (prize.endAngle + finalRotation) % 360;
          
          if (startAngle > endAngle) {
            if (0 >= 0 || 0 <= endAngle) {
              selectedPrizeName = prize.name;
              break;
            }
          } else {
            if (0 >= startAngle && 0 <= endAngle) {
              selectedPrizeName = prize.name;
              break;
            }
          }
        }
        
        const selectedPrizeInfo = prizes.find(p => p.startsWith(selectedPrizeName));
        
        if (onPrizeSelected && selectedPrizeInfo) {
          onPrizeSelected(selectedPrizeInfo);
        }
      }
    }, 16);
  };

  return (
    <button
      className="absolute w-16 h-16 bg-white text-blue-500 border border-gray-300 rounded-full text-lg font-bold flex items-center justify-center shadow hover:bg-gray-50"
      style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      onClick={handleSpin}
    >
      돌리기
    </button>
  );
}

export default SpinButton;