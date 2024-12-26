import { useState, useRef } from 'react';
import { calculateWinner, getWobblyLine, Point2D } from './utils';
import './styles.css'

export default function SpinWheel() {
  const [numOptions, setNumOptions] = useState<number>(4);
  const [points, setPoints] = useState<number[]>(Array(4).fill(1));
  const [giftNames, setGiftNames] = useState<string[]>(Array(4).fill(''));
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleNumOptionsChange = (newNum: number): void => {
    setNumOptions(newNum);
    setPoints(Array(newNum).fill(1));
    setGiftNames(prev => {
      const newNames = Array(newNum).fill('');
      return prev.concat(newNames).slice(0, newNum);
    });
  };

  const spinWheel = (): void => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Calculate a random number of full rotations (8-12) plus a random final position
    const minSpins = 8;
    const maxSpins = 12;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const extraDegrees = Math.random() * 360;
    const totalDegrees = spins * 360 + extraDegrees;

    // Make sure we continue from the current rotation to prevent resetting
    const newRotation = rotation + totalDegrees;
    console.log(newRotation);

    // Update the rotation with the new value
    setRotation(newRotation);

    const currentPoints = [...points];
    const currentNames = [...giftNames];

    // Reset spinning state after animation completes
    setTimeout(() => {
      setIsSpinning(false);
      const winningSlice = calculateWinner(newRotation, currentPoints, currentNames);
      setWinner(winningSlice);
    }, 10000); // Match this with the CSS transition duration
  };

  const generateSlices = () => {
    const radius = 150;
    const center: Point2D = { x: 200, y: 200 };
    let currentAngle = 0;
    const totalPoints = points.reduce((sum, p) => sum + p, 0);

    return points.map((point, index) => {
      const sliceAngle = (point / totalPoints) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;

      const startX = center.x + radius * Math.cos((startAngle * Math.PI) / 180);
      const startY = center.y + radius * Math.sin((startAngle * Math.PI) / 180);
      const endX = center.x + radius * Math.cos((endAngle * Math.PI) / 180);
      const endY = center.y + radius * Math.sin((endAngle * Math.PI) / 180);

      // Calculate text position and rotation
      const textAngle = startAngle + (sliceAngle / 2);
      const textRadius = radius * 0.6;
      const textX = center.x + textRadius * Math.cos((textAngle * Math.PI) / 180);
      const textY = center.y + textRadius * Math.sin((textAngle * Math.PI) / 180);

      const path = `M ${center.x},${center.y} 
                    L ${getWobblyLine(center.x, center.y, startX, startY)}
                    A ${radius} ${radius} 0 ${sliceAngle > 180 ? 1 : 0} 1 ${endX} ${endY}
                    L ${getWobblyLine(endX, endY, center.x, center.y)}`;

      currentAngle += sliceAngle;

      return (
        <g key={index}>
          <path
            d={path}
            fill={`hsl(${index * 360 / numOptions}, 70%, 70%)`}
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text
            x={textX}
            y={textY}
            fill="white"
            textAnchor="middle"
            transform={`rotate(${textAngle}, ${textX}, ${textY})`}
            className="gift-slice-label"
          >
            {giftNames[index]}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="container">
      <input
        type="range"
        min="2"
        max="10"
        value={numOptions}
        onChange={(e) => handleNumOptionsChange(parseInt(e.target.value))}
        className="number-slider"
      />

      <div className="gifts-grid">
        {points.map((point, index) => (
          <div key={index} className="gift-input-group">
            <input
              value={giftNames[index]}
              onChange={(e) => {
                const newNames = [...giftNames];
                newNames[index] = e.target.value;
                setGiftNames(newNames);
              }}
              placeholder={`Gift ${index + 1} name`}
              className="gift-name-input"
            />
            <input
              type="range"
              value={point}
              onChange={(e) => {
                const newPoints = [...points];
                newPoints[index] = Math.max(1, parseInt(e.target.value) || 1);
                setPoints(newPoints);
              }}
              min="1"
              max="10"
              placeholder="Points"
              className="points-slider"
            />
          </div>
        ))}
      </div>

      <div className="wheel-container">
        <div className="wheel-pointer" />

        <div
          ref={wheelRef}
          className="wheel"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            {generateSlices()}
          </svg>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="spin-button"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>

      {winner && (
        <div className="winner-announcement">
          🎉 Winner: {winner}!
        </div>
      )}
    </div>
  );
};
