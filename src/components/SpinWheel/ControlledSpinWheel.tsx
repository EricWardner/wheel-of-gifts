import React, { useState } from 'react';
import WheelControls from './WheelControls';
import SpinWheel from './SpinWheel';

const ControlledSpinWheel: React.FC = () => {
  const [numOptions, setNumOptions] = useState<number>(4);
  const [points, setPoints] = useState<number[]>(Array(4).fill(1));
  const [giftNames, setGiftNames] = useState<string[]>(Array(4).fill(''));
  const [winner, setWinner] = useState<string | null>(null);

  const handleNumOptionsChange = (newNum: number): void => {
    setNumOptions(newNum);
    setPoints(Array(newNum).fill(1));
    setGiftNames(prev => {
      const newNames = Array(newNum).fill('');
      return prev.concat(newNames).slice(0, newNum);
    });
  };

  const handlePointChange = (index: number, value: number): void => {
    const newPoints = [...points];
    newPoints[index] = value;
    setPoints(newPoints);
  };

  const handleNameChange = (index: number, value: string): void => {
    const newNames = [...giftNames];
    newNames[index] = value;
    setGiftNames(newNames);
  };

  return (
    <div className="controlled-wheel-container">
      <WheelControls
        numOptions={numOptions}
        points={points}
        giftNames={giftNames}
        onNumOptionsChange={handleNumOptionsChange}
        onPointsChange={handlePointChange}
        onNameChange={handleNameChange}
      />

      <SpinWheel
        points={points}
        giftNames={giftNames}
      />
    </div>
  );
};

export default ControlledSpinWheel;