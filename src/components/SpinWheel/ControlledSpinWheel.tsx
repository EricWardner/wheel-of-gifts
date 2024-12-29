import React, { useState } from 'react';
import WheelControls from './WheelControls';
import SpinWheel from './SpinWheel';
import { Flex } from '@radix-ui/themes';

const initialGiftNames = ['Gift 1', 'Gift 2', 'Gift 3', '', '']

const ControlledSpinWheel: React.FC = () => {
  const [numOptions, setNumOptions] = useState<number>(5);
  const [points, setPoints] = useState<number[]>(Array(5).fill(5));
  const [giftNames, setGiftNames] = useState<string[]>(initialGiftNames);

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
    <Flex justify={"center"} direction={{lg: "row", initial: "column"}} gap={{lg: "150px", initial: "40px"}}>
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