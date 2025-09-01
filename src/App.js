import React, { useState, useEffect } from 'react';
import LetterGame from './components/LetterGame';
import NumberGame from './components/NumberGame';
import TraceGame from './components/TraceGame';

const letters = [
  { id: 1, letter: 'А', sound: '/sounds/letter_a.mp3', image: '/images/apple.png' },
  { id: 2, letter: 'Б', sound: '/sounds/letter_b.mp3', image: '/images/ball.png' },
  { id: 3, letter: 'В', sound: '/sounds/letter_v.mp3', image: '/images/wind.png' }
];

const numbers = [
  { id: 1, number: '1', count: 1, image: '/images/one_apple.png' },
  { id: 2, number: '2', count: 2, image: '/images/two_balls.png' },
  { id: 3, number: '3', count: 3, image: '/images/three_stars.png' }
];

const traceShapes = [
  { id: 1, shape: 'А', points: [[50, 50], [50, 150], [100, 100], [150, 150], [150, 50]] },
  { id: 2, shape: '1', points: [[100, 50], [100, 150]] }
];

function App() {
  const [gameMode, setGameMode] = useState('menu');
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const savedStars = localStorage.getItem('stars') || 0;
    setStars(parseInt(savedStars, 10));
  }, []);

  const addStar = () => {
    const newStars = stars + 1;
    setStars(newStars);
    localStorage.setItem('stars', newStars);
  };

  const resetGame = () => {
    setGameMode('menu');
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Приключение с буквами и цифрами</h1>
      <p className="text-xl mb-4">Звёзды: {stars} 🌟</p>
      {gameMode === 'menu' ? (
        <div className="flex flex-col space-y-4 max-w-md w-full">
          <button
            onClick={() => setGameMode('letters')}
            className="bg-blue-500 text-white text-2xl p-4 rounded-lg shadow-md"
          >
            Учи буквы
          </button>
          <button
            onClick={() => setGameMode('numbers')}
            className="bg-green-500 text-white text-2xl p-4 rounded-lg shadow-md"
          >
            Учи цифры
          </button>
          <button
            onClick={() => setGameMode('trace')}
            className="bg-purple-500 text-white text-2xl p-4 rounded-lg shadow-md"
          >
            Обводи фигуры
          </button>
        </div>
      ) : gameMode === 'letters' ? (
        <LetterGame letters={letters} addStar={addStar} onBack={resetGame} />
      ) : gameMode === 'numbers' ? (
        <NumberGame numbers={numbers} addStar={addStar} onBack={resetGame} />
      ) : (
        <TraceGame shapes={traceShapes} addStar={addStar} onBack={resetGame} />
      )}
    </div>
  );
}

export default App;