import { Box, Card, Flex, ScrollArea, Section, Slider, TextField } from '@radix-ui/themes';
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
    <Section p="4">
      <Flex direction="column" gap="6" minWidth="300px">
        <Box>
          <Slider
            min={2}
            max={10}
            value={[numOptions]}
            onValueChange={(e) => onNumOptionsChange(e[0])}
            size="3"
          />
        </Box>

        <Card>
          <ScrollArea type='auto' style={{ height: 400 }}>
            <Flex direction="column" gap={{ initial: "8", sm: "4" }} p="5">
              {points.map((point, index) => (
                <Flex
                  key={index}
                  direction={{ initial: "column", sm: "row" }}
                  gap="3"
                  align={{ initial: "stretch", sm: "center" }}
                >
                  <TextField.Root style={{ minWidth: '140px' }}
                    value={giftNames[index]}
                    size="3"
                    onChange={(e) => onNameChange(index, e.target.value)}
                    placeholder={`Gift ${index + 1} name`}
                  />
                  <Box minWidth="200px">
                    <Slider
                      value={[point]}
                      onValueChange={(e) => onPointsChange(index, Math.max(1, e[0] || 1))}
                      min={1}
                      max={10}
                      size="3"
                    />
                  </Box>
                </Flex>
              ))}
            </Flex>
          </ScrollArea>
        </Card>
      </Flex>
    </Section>
  );
};

export default WheelControls;