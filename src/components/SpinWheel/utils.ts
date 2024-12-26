export interface Point2D {
    x: number;
    y: number;
}

export function calculateWinner(currentRotation: number, currentPoints: number[], currentNames: string[]) {
    let normalizedRotation = (360 - (currentRotation % 360) + 180) % 360;

    const totalPoints = currentPoints.reduce((sum, p) => sum + p, 0);

    let currentAngle = 0;
    for (let i = 0; i < currentPoints.length; i++) {
        const sliceAngle = (currentPoints[i] / totalPoints) * 360;
        if (normalizedRotation >= currentAngle && normalizedRotation < currentAngle + sliceAngle) {
            return currentNames[i] || `Option ${i + 1}`;
        }
        currentAngle += sliceAngle;
    }
    return currentNames[0] || 'Option 1';
};

export function getWobblyLine(startX: number, startY: number, endX: number, endY: number): string {
    const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 5;
    const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 5;
    return `${startX},${startY} ${midX},${midY} ${endX},${endY}`;
};