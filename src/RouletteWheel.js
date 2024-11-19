import React, { useState } from 'react';
import './Roulette.css';
import SpinButton from './SpinButton';

function RouletteWheel({ prizes, onPrizeSelected }) {
  const [rotation, setRotation] = useState(0);

  // 상품별 수량을 계산하고 각도를 결정하는 함수
  const calculatePrizeRatios = (prizesList) => {
    // 각 상품별 수량 계산
    const prizeQuantities = prizesList.reduce((acc, prize) => {
      const [name, quantityStr] = prize.split(' ');
      const quantity = parseInt(quantityStr) || 1;
      
      if (acc[name]) {
        acc[name] += quantity;
      } else {
        acc[name] = quantity;
      }
      return acc;
    }, {});

    // 전체 수량 계산
    const totalQuantity = Object.values(prizeQuantities).reduce((sum, count) => sum + count, 0);
    
    // 각 상품의 비율과 시작 각도 계산
    let currentAngle = 0;
    const prizeRatios = [];

    Object.entries(prizeQuantities).forEach(([name, quantity]) => {
      const ratio = quantity / totalQuantity;
      const angle = ratio * 360;
      
      prizeRatios.push({
        name,
        quantity,
        ratio,
        startAngle: currentAngle,
        endAngle: currentAngle + angle
      });
      
      currentAngle += angle;
    });

    return prizeRatios;
  };

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC733', '#33FFC7'];
  const prizeRatios = calculatePrizeRatios(prizes);

  const gradientColors = prizeRatios
    .map((prize, index) => 
      `${colors[index % colors.length]} ${(prize.startAngle / 360) * 100}% ${
        (prize.endAngle / 360) * 100
      }%`
    )
    .join(', ');

  const handlePrizeSelected = (prize) => {
    if (onPrizeSelected) {
      onPrizeSelected(prize);
    }
  };

  return (
    <div className="relative">
      <div
        className="roulette-circle"
        style={{
          background: `conic-gradient(${gradientColors})`,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {prizeRatios.map((prize, index) => {
          const textAngle = prize.startAngle + (prize.endAngle - prize.startAngle) / 2;

          return (
            <div
              key={index}
              className="absolute w-full h-full flex items-center justify-center"
              style={{
                transform: `rotate(${textAngle}deg)`,
                transformOrigin: 'center center',
              }}
            >
              <span
                className="roulette-text"
                style={{
                  transform: `rotate(-${textAngle}deg)`,
                  transformOrigin: 'center center',
                  position: 'absolute',
                  top: '25%',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                {prize.name}
              </span>
            </div>
          );
        })}
        
        <SpinButton
          prizes={prizes}
          rotation={rotation}
          setRotation={setRotation}
          onPrizeSelected={handlePrizeSelected}
          prizeRatios={prizeRatios}  // 비율 정보 전달
        />
      </div>
    </div>
  );
}

export default RouletteWheel;