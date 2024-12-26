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
    <div className="wheel-controls-container">
      <input
        type="range"
        min="2" 
        max="10" 
        value={numOptions}
        onChange={(e) => onNumOptionsChange(parseInt(e.target.value))}
        className="number-slider"
      />
      
      <div className="gifts-grid">
        {points.map((point, index) => (
          <div key={index} className="gift-input-group">
            <input
              value={giftNames[index]}
              onChange={(e) => onNameChange(index, e.target.value)}
              placeholder={`Gift ${index + 1} name`}
              className="gift-name-input"
            />
            <input
              type="range"
              value={point}
              onChange={(e) => onPointsChange(index, Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="10"
              className="points-slider"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WheelControls