import React, { useState } from 'react';

const TraceGame = ({ shapes, addStar, onBack }) => {
  const [currentShape, setCurrentShape] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleTrace = (x, y) => {
    const point = shapes[currentShape].points[currentPoint];
    if (Math.abs(point[0] - x) < 20 && Math.abs(point[1] - y) < 20) {
      if (currentPoint + 1 < shapes[currentShape].points.length) {
        setCurrentPoint(currentPoint + 1);
      } else {
        setFeedback('Молодец! Ты обвёл фигуру! 🌟');
        addStar();
        setTimeout(() => {
          if (currentShape + 1 < shapes.length) {
            setCurrentShape(currentShape + 1);
            setCurrentPoint(0);
            setFeedback('');
          } else {
            setFeedback('Ты обвёл все фигуры!');
          }
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
      <h2 className="text-2xl font-semibold mb-4">Обведи фигуру: {shapes[currentShape].shape}</h2>
      <svg
        width="200"
        height="200"
        className="mx-auto mb-4 border"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          handleTrace(x, y);
        }}
      >
        {shapes[currentShape].points.map((point, index) => (
          <circle
            key={index}
            cx={point[0]}
            cy={point[1]}
            r="10"
            fill={index < currentPoint ? 'green' : 'red'}
          />
        ))}
      </svg>
      {feedback && <p className="text-lg font-medium">{feedback}</p>}
      <button
        onClick={onBack}
        className="mt-4 bg-red-500 text-white p-2 rounded-lg w-full"
      >
        Назад
      </button>
    </div>
  );
};

export default TraceGame;