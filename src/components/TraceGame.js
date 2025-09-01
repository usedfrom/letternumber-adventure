import React, { useState, useRef, useEffect } from 'react';

const TraceGame = ({ shapes, addStar, onBack }) => {
  const [currentShape, setCurrentShape] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [mode, setMode] = useState('points'); // 'points' или 'free'
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (mode === 'free' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = new Image();
      img.src = shapes[currentShape].template;
      img.onload = () => {
        ctx.globalAlpha = 0.3;
        ctx.drawImage(img, 50, 50, 100, 100);
        ctx.globalAlpha = 1.0;
      };
    }
  }, [currentShape, mode]);

  const handleTracePoints = (x, y) => {
    if (mode !== 'points') return;
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

  const startDrawing = (e) => {
    if (mode !== 'free') return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || mode !== 'free') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (mode !== 'free') return;
    setIsDrawing(false);
    setFeedback('Молодец! Ты нарисовал фигуру! 🌟');
    addStar();
    setTimeout(() => {
      if (currentShape + 1 < shapes.length) {
        setCurrentShape(currentShape + 1);
        setFeedback('');
      } else {
        setFeedback('Ты нарисовал все фигуры!');
      }
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
      <h2 className="text-2xl font-semibold mb-4">Обведи: {shapes[currentShape].shape}</h2>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setMode('points')}
          className={`p-2 rounded-lg ${mode === 'points' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          По точкам
        </button>
        <button
          onClick={() => setMode('free')}
          className={`p-2 rounded-lg ${mode === 'free' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          Свободно
        </button>
      </div>
      {mode === 'points' ? (
        <svg
          width="200"
          height="200"
          className="mx-auto mb-4 border"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            handleTracePoints(x, y);
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
      ) : (
        <canvas
          ref={canvasRef}
          width="200"
          height="200"
          className="mx-auto mb-4 border"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            draw({ clientX: touch.clientX, clientY: touch.clientY });
          }}
          onTouchEnd={stopDrawing}
        />
      )}
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
  );
};


export default TraceGame;
