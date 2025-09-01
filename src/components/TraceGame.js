import React, { useState, useRef, useEffect } from 'react';

const TraceGame = ({ shapes, addStar, onBack }) => {
  const [currentShape, setCurrentShape] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [mode, setMode] = useState('contour'); // 'contour' или 'free'
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState([]);
  const canvasRef = useRef(null);

  // Ключевые точки для распознавания
  const getKeyPoints = (shape) => {
    const points = shapes.find(s => s.shape === shape).points;
    return points.map(([x, y]) => ({ x, y }));
  };

  // Проверка покрытия ключевых точек
  const checkDrawing = () => {
    const keyPoints = getKeyPoints(shapes[currentShape].shape);
    let hitCount = 0;
    keyPoints.forEach(point => {
      const hit = drawnPoints.some(dp => 
        Math.sqrt((dp.x - point.x) ** 2 + (dp.y - point.y) ** 2) < 30
      );
      if (hit) hitCount++;
    });
    return hitCount / keyPoints.length >= 0.7; // 70% точек покрыто
  };

  const handleContourTrace = (x, y) => {
    if (mode !== 'contour') return;
    const point = shapes[currentShape].points[currentPoint];
    const distance = Math.sqrt((point[0] - x) ** 2 + (point[1] - y) ** 2);
    if (distance < 30) {
      if (currentPoint + 1 < shapes[currentShape].points.length) {
        setCurrentPoint(currentPoint + 1);
        setFeedback('Отлично, обведи следующую точку!');
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
      setFeedback('Кликни ближе к контуру!');
    }
  };

  const startDrawing = (e) => {
    if (mode !== 'free') return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawnPoints([{ x, y }]);
  };

  const draw = (e) => {
    if (!isDrawing || mode !== 'free') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.stroke();
    setDrawnPoints(prev => [...prev, { x, y }]);
  };

  const stopDrawing = () => {
    if (mode !== 'free') return;
    setIsDrawing(false);
    const isCorrect = checkDrawing();
    setFeedback(isCorrect ? 'Верно! Ты нарисовал правильно! 🌟' : 'Попробуй ещё раз!');
    if (isCorrect) {
      addStar();
      setTimeout(() => {
        if (currentShape + 1 < shapes.length) {
          setCurrentShape(currentShape + 1);
          setDrawnPoints([]);
          setFeedback('');
        } else {
          setFeedback('Ты нарисовал все фигуры!');
        }
      }, 1500);
    }
  };

  useEffect(() => {
    if (mode === 'free' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '100px Balsamiq Sans';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(shapes[currentShape].shape, 100, 100);
    }
  }, [currentShape, mode]);

  // SVG-путь для контура
  const getContourPath = (shape) => {
    const points = shapes.find(s => s.shape === shape).points;
    return `M${points[0][0]},${points[0][1]} ` + 
           points.slice(1).map(p => `L${p[0]},${p[1]}`).join(' ');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
      <h2 className="text-4xl font-bold mb-4 gradient-text">Обведи: {shapes[currentShape].shape}</h2>
      <p className="text-xl mb-4">
        {mode === 'contour' ? `Обведи ${shapes[currentShape].shape} по контуру!` : `Нарисуй ${shapes[currentShape].shape} сам!`}
      </p>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => {
            setMode('contour');
            setFeedback('');
            setCurrentPoint(0);
          }}
          className={`p-3 rounded-lg text-xl ${mode === 'contour' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          По контуру
        </button>
        <button
          onClick={() => {
            setMode('free');
            setFeedback('');
            setDrawnPoints([]);
          }}
          className={`p-3 rounded-lg text-xl ${mode === 'free' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          Свободно
        </button>
      </div>
      {mode === 'contour' ? (
        <svg
          width="200"
          height="200"
          className="mx-auto mb-4 border"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            handleContourTrace(x, y);
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ff6b6b', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4ecdc4', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <text
            x="100"
            y="100"
            fontFamily="Balsamiq Sans"
            fontSize="100"
            fill="rgba(0, 0, 0, 0.3)"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {shapes[currentShape].shape}
          </text>
          <path
            d={getContourPath(shapes[currentShape].shape)}
            className="gradient-border animate-pulse"
            strokeWidth="4"
            fill="none"
          />
          {shapes[currentShape].points.map((point, index) => (
            <circle
              key={index}
              cx={point[0]}
              cy={point[1]}
              r="12"
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
                strokeWidth="4"
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
      {feedback && <p className="text-xl font-medium gradient-text">{feedback}</p>}
      <button
        onClick={onBack}
        className="mt-4 bg-red-500 text-white p-3 rounded-lg w-full text-xl"
      >
        Назад
      </button>
    </div>
  );
};

export default TraceGame;
