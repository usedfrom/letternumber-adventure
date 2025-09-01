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
        ctx.drawImage(img, 25, 25, 150, 150); // Увеличенный шаблон
        ctx.globalAlpha = 1.0;
      };
      img.onerror = () => {
        console.error(`Failed to load template: ${shapes[currentShape].template}`);
        setFeedback('Не удалось загрузить шаблон. Попробуй другую фигуру!');
      };
    }
  }, [currentShape, mode]);

  const handleTracePoints = (x, y) => {
    if (mode !== 'points') return;
    const point = shapes[currentShape].points[currentPoint];
    const distance = Math.sqrt((point[0] - x) ** 2 + (point[1] - y) ** 2);
    if (distance < 30) { // Увеличен радиус срабатывания
      if (currentPoint + 1 < shapes[currentShape].points.length) {
        setCurrentPoint(currentPoint + 1);
        setFeedback('Отлично, кликни следующую точку!');
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
        }, 1500);
      }
    } else {
      setFeedback('Кликни ближе к точке!');
    }
  };

  const startDrawing = (e) => {
    if (mode !== 'free') return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || mode !== 'free') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
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
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
      <h2 className="text-3xl font-bold mb-4">Обведи: {shapes[currentShape].shape}</h2>
      <p className="text-lg mb-4">
        {mode === 'points' ? 'Кликни по красным точкам!' : 'Рисуй по контуру буквы или цифры!'}
      </p>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => {
            setMode('points');
            setFeedback('');
            setCurrentPoint(0);
          }}
          className={`p-3 rounded-lg text-lg ${mode === 'points' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          По точкам
        </button>
        <button
          onClick={() => {
            setMode('free');
            setFeedback('');
          }}
          className={`p-3 rounded-lg text-lg ${mode === 'free' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
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
              r="12" // Увеличен размер точек
              fill={index < currentPoint ? 'green' : 'red'}
              className="hover:scale-110 transition-transform"
            />
          ))}
          {shapes[currentShape].points.slice(0, currentPoint).map((point, index) => (
            index < currentPoint - 1 && (
              <line
                key={`line-${index}`}
                x1={shapes[currentShape].points[index][0]}
                y1={shapes[currentShape].points[index][1]}
                x2={shapes[currentShape].points[index + 1][0]}
                y2={shapes[currentShape].points[index + 1][1]}
                stroke="green"
                strokeWidth="3"
              />
            )
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
          onTouchStart={(e) => startDrawing(e)}
          onTouchMove={(e) => draw(e)}
          onTouchEnd={stopDrawing}
        />
      )}
      {feedback && <p className="text-xl font-medium text-blue-600">{feedback}</p>}
      <button
        onClick={onBack}
        className="mt-4 bg-red-500 text-white p-3 rounded-lg w-full text-lg"
      >
        Назад
      </button>
    </div>
  );
};

export default TraceGame;
