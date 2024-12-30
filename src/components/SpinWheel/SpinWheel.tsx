import { useState, useRef } from 'react';
import { calculateWinner, getWobblyLine, Point2D } from './utils';
import './styles.css'
import { Button, Flex } from '@radix-ui/themes';
import SpinTheWheelTitle from '../../SpinTheWheelTitle';
import confetti from 'canvas-confetti';

interface SpinWheelProps {
  points: number[];
  giftNames: string[];
  onSpinningChange?: (spinning: boolean) => void;
}

export default function SpinWheel(props: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const RADIUS = 150;
  const CENTER: Point2D = { x: 200, y: 200 };

  const spinWheel = (): void => {
    setWinner(null)
    if (isSpinning) return;

    setIsSpinning(true);
    props.onSpinningChange?.(true);

    // Calculate a random number of full rotations (8-12) plus a random final position
    const minSpins = 8;
    const maxSpins = 12;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const extraDegrees = Math.random() * 360;
    const totalDegrees = spins * 360 + extraDegrees;

    // Make sure we continue from the current rotation to prevent resetting
    const newRotation = rotation + totalDegrees;

    setRotation(newRotation);

    const currentPoints = [...props.points];
    const currentNames = [...props.giftNames];

    setTimeout(() => {
      setIsSpinning(false);
      props.onSpinningChange?.(false);
      const winningSlice = calculateWinner(newRotation, currentPoints, currentNames);
      setWinner(winningSlice);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0, y: 0 },
        angle: 325
      });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 1, y: 0 },
        angle: 215
      });
    }, 10000); // Match this with the CSS transition duration
  };

  const generateSlices = () => {
    let currentAngle = 0;
    const totalPoints = props.points.reduce((sum, p) => sum + p, 0);

    return props.points.map((point, index) => {
      const sliceAngle = (point / totalPoints) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;

      const startX = CENTER.x + RADIUS * Math.cos((startAngle * Math.PI) / 180);
      const startY = CENTER.y + RADIUS * Math.sin((startAngle * Math.PI) / 180);
      const endX = CENTER.x + RADIUS * Math.cos((endAngle * Math.PI) / 180);
      const endY = CENTER.y + RADIUS * Math.sin((endAngle * Math.PI) / 180);

      const textAngle = startAngle + (sliceAngle / 2);
      const textRadius = RADIUS * 0.6;
      const textX = CENTER.x + textRadius * Math.cos((textAngle * Math.PI) / 180);
      const textY = CENTER.y + textRadius * Math.sin((textAngle * Math.PI) / 180);

      const path = `M ${CENTER.x},${CENTER.y} 
                    L ${getWobblyLine(CENTER.x, CENTER.y, startX, startY)}
                    A ${RADIUS} ${RADIUS} 0 ${sliceAngle > 180 ? 1 : 0} 1 ${endX} ${endY}
                    L ${getWobblyLine(endX, endY, CENTER.x, CENTER.y)}`;

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
            transform={`rotate(${textAngle - 180}, ${textX}, ${textY})`}
            className="gift-slice-label"
          >
            {props.giftNames[index]}
          </text>
        </g>
      );
    });
  };

  return (
    <Flex direction={"column"} gap={"3"} p={"4"}>
      <SpinTheWheelTitle width='400' />
      <Flex justify={"center"} align={"center"}>
        <svg height="40px" style={{ position: "relative", zIndex: 10 }} viewBox="6 4 4.5 7" xmlns="http://www.w3.org/2000/svg"><path d="M6 11L6 4L10.5 7.5L6 11Z" fill="currentColor" /></svg>

        <div
          ref={wheelRef}
          className="wheel"
          style={{ transform: `rotate(${rotation}deg)`, marginRight: 20 }}
        >
          <svg viewBox="50 50 304 304">
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={RADIUS}
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            {generateSlices()}
          </svg>
        </div>
      </Flex>

      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        size="3"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </Button>

      {winner && (
        <div className="winner-announcement">
          🎉 Winner: {winner}!
        </div>
      )}
    </Flex>
  );
};
