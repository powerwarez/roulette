import React from 'react';

function Pointer() {
  return (
    <div
      className="roulette-pointer"
      style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderBottom: '30px solid red',
      }}
    />
  );
}

export default Pointer;