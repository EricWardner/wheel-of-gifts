import { Box, Flex, Grid, Slider } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";
import React from 'react';

interface WheelControlsProps {
  numOptions: number;
  points: number[];
  giftNames: string[];
  onNumOptionsChange: (value: number) => void;
  onPointsChange: (index: number, value: number) => void;
  onNameChange: (index: number, value: string) => void;
}

const WheelControls: React.FC<WheelControlsProps> = ({
  numOptions,
  points,
  giftNames,
  onNumOptionsChange,
  onPointsChange,
  onNameChange
}) => {
  return (
    <Flex direction="column" gap="32px">
      <Slider
        min={2}
        max={10}
        value={[numOptions]}
        onValueChange={(e) => onNumOptionsChange(e[0])}
        size="3"
      />

      <Grid columns={"1"} gap="6">
        {points.map((point, index) => (
          <Flex align={"center"} gap={"4"}>
            <input
              value={giftNames[index]}
              onChange={(e) => onNameChange(index, e.target.value)}
              placeholder={`Gift ${index + 1} name`}
              className="gift-name-input"
            />
            <Slider
              value={[point]}
              onValueChange={(e) => onPointsChange(index, Math.max(1, e[0] || 1))}
              min={1}
              max={10}
            />
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};

export default WheelControls