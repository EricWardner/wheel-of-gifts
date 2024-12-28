import React, { useState } from 'react';
import WheelControls from './WheelControls';
import SpinWheel from './SpinWheel';
import { Box, Flex } from '@radix-ui/themes';

const ControlledSpinWheel: React.FC = () => {
  const [numOptions, setNumOptions] = useState<number>(4);
  const [points, setPoints] = useState<number[]>(Array(4).fill(1));
  const [giftNames, setGiftNames] = useState<string[]>(Array(4).fill(''));

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
    <Flex direction={{lg: "row", initial: "column"}} gap={{lg: "150px", initial: "40px"}}>
      <SpinWheel
        points={points}
        giftNames={giftNames}
      />
      <WheelControls
        numOptions={numOptions}
        points={points}
        giftNames={giftNames}
        onNumOptionsChange={handleNumOptionsChange}
        onPointsChange={handlePointChange}
        onNameChange={handleNameChange}
      />
    </Flex>
  );
};

export default ControlledSpinWheel;