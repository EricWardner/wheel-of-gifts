import { useState, useRef } from 'react';
import { calculateWinner, getWobblyLine, Point2D } from './utils';
import './styles.css'

interface SpinWheelProps {
  points: number[];
  giftNames: string[];
}

export default function SpinWheel(props: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);


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

    // Update the rotation with the new value
    setRotation(newRotation);

    const currentPoints = [...props.points];
    const currentNames = [...props.giftNames];

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
    const totalPoints = props.points.reduce((sum, p) => sum + p, 0);

    return props.points.map((point, index) => {
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
            fill={`hsl(${index * 360 / props.points.length}, 70%, 70%)`}
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
            {props.giftNames[index]}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="game-container">
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
