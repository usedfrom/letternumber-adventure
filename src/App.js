import React, { useState, useEffect } from 'react';
import LetterGame from './components/LetterGame';
import NumberGame from './components/NumberGame';
import TraceGame from './components/TraceGame';

const letters = [
  { id: 1, letter: 'А', sound: '/sounds/letter_a.mp3', image: '/images/a.png', template: '/templates/a.png' },
  { id: 2, letter: 'Б', sound: '/sounds/letter_b.mp3', image: '/images/b.png', template: '/templates/b.png' },
  { id: 3, letter: 'В', sound: '/sounds/letter_v.mp3', image: '/images/v.png', template: '/templates/v.png' },
  { id: 4, letter: 'Г', sound: '/sounds/letter_g.mp3', image: '/images/g.png', template: '/templates/g.png' },
  { id: 5, letter: 'Д', sound: '/sounds/letter_d.mp3', image: '/images/d.png', template: '/templates/d.png' },
  { id: 6, letter: 'Е', sound: '/sounds/letter_e.mp3', image: '/images/e.png', template: '/templates/e.png' },
  { id: 7, letter: 'Ё', sound: '/sounds/letter_yo.mp3', image: '/images/yo.png', template: '/templates/yo.png' },
  { id: 8, letter: 'Ж', sound: '/sounds/letter_zh.mp3', image: '/images/zh.png', template: '/templates/zh.png' },
  { id: 9, letter: 'З', sound: '/sounds/letter_z.mp3', image: '/images/z.png', template: '/templates/z.png' },
  { id: 10, letter: 'И', sound: '/sounds/letter_i.mp3', image: '/images/i.png', template: '/templates/i.png' },
  { id: 11, letter: 'Й', sound: '/sounds/letter_y.mp3', image: '/images/y.png', template: '/templates/y.png' },
  { id: 12, letter: 'К', sound: '/sounds/letter_k.mp3', image: '/images/k.png', template: '/templates/k.png' },
  { id: 13, letter: 'Л', sound: '/sounds/letter_l.mp3', image: '/images/l.png', template: '/templates/l.png' },
  { id: 14, letter: 'М', sound: '/sounds/letter_m.mp3', image: '/images/m.png', template: '/templates/m.png' },
  { id: 15, letter: 'Н', sound: '/sounds/letter_n.mp3', image: '/images/n.png', template: '/templates/n.png' },
  { id: 16, letter: 'О', sound: '/sounds/letter_o.mp3', image: '/images/o.png', template: '/templates/o.png' },
  { id: 17, letter: 'П', sound: '/sounds/letter_p.mp3', image: '/images/p.png', template: '/templates/p.png' },
  { id: 18, letter: 'Р', sound: '/sounds/letter_r.mp3', image: '/images/r.png', template: '/templates/r.png' },
  { id: 19, letter: 'С', sound: '/sounds/letter_s.mp3', image: '/images/s.png', template: '/templates/s.png' },
  { id: 20, letter: 'Т', sound: '/sounds/letter_t.mp3', image: '/images/t.png', template: '/templates/t.png' },
  { id: 21, letter: 'У', sound: '/sounds/letter_u.mp3', image: '/images/u.png', template: '/templates/u.png' },
  { id: 22, letter: 'Ф', sound: '/sounds/letter_f.mp3', image: '/images/f.png', template: '/templates/f.png' },
  { id: 23, letter: 'Х', sound: '/sounds/letter_h.mp3', image: '/images/h.png', template: '/templates/h.png' },
  { id: 24, letter: 'Ц', sound: '/sounds/letter_ts.mp3', image: '/images/ts.png', template: '/templates/ts.png' },
  { id: 25, letter: 'Ч', sound: '/sounds/letter_ch.mp3', image: '/images/ch.png', template: '/templates/ch.png' },
  { id: 26, letter: 'Ш', sound: '/sounds/letter_sh.mp3', image: '/images/sh.png', template: '/templates/sh.png' },
  { id: 27, letter: 'Щ', sound: '/sounds/letter_shch.mp3', image: '/images/shch.png', template: '/templates/shch.png' },
  { id: 28, letter: 'Ъ', sound: '/sounds/letter_hard.mp3', image: '/images/hard.png', template: '/templates/hard.png' },
  { id: 29, letter: 'Ы', sound: '/sounds/letter_yi.mp3', image: '/images/yi.png', template: '/templates/yi.png' },
  { id: 30, letter: 'Ь', sound: '/sounds/letter_soft.mp3', image: '/images/soft.png', template: '/templates/soft.png' },
  { id: 31, letter: 'Э', sound: '/sounds/letter_eh.mp3', image: '/images/eh.png', template: '/templates/eh.png' },
  { id: 32, letter: 'Ю', sound: '/sounds/letter_yu.mp3', image: '/images/yu.png', template: '/templates/yu.png' },
  { id: 33, letter: 'Я', sound: '/sounds/letter_ya.mp3', image: '/images/ya.png', template: '/templates/ya.png' }
];

const numbers = [
  { id: 1, number: '0', count: 0, image: '/images/zero.png', template: '/templates/0.png' },
  { id: 2, number: '1', count: 1, image: '/images/one.png', template: '/templates/1.png' },
  { id: 3, number: '2', count: 2, image: '/images/two.png', template: '/templates/2.png' },
  { id: 4, number: '3', count: 3, image: '/images/three.png', template: '/templates/3.png' },
  { id: 5, number: '4', count: 4, image: '/images/four.png', template: '/templates/4.png' },
  { id: 6, number: '5', count: 5, image: '/images/five.png', template: '/templates/5.png' },
  { id: 7, number: '6', count: 6, image: '/images/six.png', template: '/templates/6.png' },
  { id: 8, number: '7', count: 7, image: '/images/seven.png', template: '/templates/7.png' },
  { id: 9, number: '8', count: 8, image: '/images/eight.png', template: '/templates/8.png' },
  { id: 10, number: '9', count: 9, image: '/images/nine.png', template: '/templates/9.png' }
];

const traceShapes = [
  { id: 1, shape: 'А', points: [[50, 50], [50, 150], [100, 100], [150, 150], [150, 50]], template: '/templates/a.png' },
  { id: 2, shape: 'Б', points: [[50, 50], [50, 150], [100, 50], [100, 100], [50, 100]], template: '/templates/b.png' },
  { id: 3, shape: 'В', points: [[50, 50], [50, 150], [100, 100], [150, 50], [150, 150]], template: '/templates/v.png' },
  { id: 4, shape: 'Г', points: [[50, 50], [50, 150], [150, 50]], template: '/templates/g.png' },
  { id: 5, shape: 'Д', points: [[50, 50], [50, 150], [150, 150], [150, 50], [100, 100]], template: '/templates/d.png' },
  { id: 6, shape: 'Е', points: [[50, 50], [50, 150], [150, 50], [150, 100], [50, 100]], template: '/templates/e.png' },
  { id: 7, shape: 'Ё', points: [[50, 50], [50, 150], [150, 50], [150, 100], [50, 100]], template: '/templates/yo.png' },
  { id: 8, shape: 'Ж', points: [[100, 50], [100, 150], [50, 100], [150, 100]], template: '/templates/zh.png' },
  { id: 9, shape: 'З', points: [[50, 50], [150, 50], [100, 100], [150, 150], [50, 150]], template: '/templates/z.png' },
  { id: 10, shape: 'И', points: [[50, 50], [50, 150], [150, 50], [150, 150]], template: '/templates/i.png' },
  { id: 11, shape: 'Й', points: [[50, 50], [50, 150], [150, 50], [150, 150]], template: '/templates/y.png' },
  { id: 12, shape: 'К', points: [[50, 50], [50, 150], [150, 100], [100, 50], [100, 150]], template: '/templates/k.png' },
  { id: 13, shape: 'Л', points: [[50, 50], [50, 150], [150, 150]], template: '/templates/l.png' },
  { id: 14, shape: 'М', points: [[50, 50], [50, 150], [100, 100], [150, 50], [150, 150]], template: '/templates/m.png' },
  { id: 15, shape: 'Н', points: [[50, 50], [50, 150], [150, 50], [150, 150], [100, 100]], template: '/templates/n.png' },
  { id: 16, shape: 'О', points: [[50, 100], [100, 50], [150, 100], [100, 150]], template: '/templates/o.png' },
  { id: 17, shape: 'П', points: [[50, 50], [50, 150], [150, 50], [150, 150]], template: '/templates/p.png' },
  { id: 18, shape: 'Р', points: [[50, 50], [50, 150], [100, 50], [100, 100], [150, 100]], template: '/templates/r.png' },
  { id: 19, shape: 'С', points: [[50, 50], [150, 50], [100, 100], [50, 150], [150, 150]], template: '/templates/s.png' },
  { id: 20, shape: 'Т', points: [[50, 50], [150, 50], [100, 50], [100, 150]], template: '/templates/t.png' },
  { id: 21, shape: 'У', points: [[50, 50], [100, 150], [150, 50]], template: '/templates/u.png' },
  { id: 22, shape: 'Ф', points: [[100, 50], [100, 150], [50, 100], [150, 100]], template: '/templates/f.png' },
  { id: 23, shape: 'Х', points: [[50, 50], [150, 150], [150, 50], [50, 150]], template: '/templates/h.png' },
  { id: 24, shape: 'Ц', points: [[50, 50], [50, 150], [150, 50], [150, 150], [150, 175]], template: '/templates/ts.png' },
  { id: 25, shape: 'Ч', points: [[100, 50], [150, 50], [100, 150]], template: '/templates/ch.png' },
  { id: 26, shape: 'Ш', points: [[50, 50], [50, 150], [100, 50], [100, 150], [150, 50], [150, 150]], template: '/templates/sh.png' },
  { id: 27, shape: 'Щ', points: [[50, 50], [50, 150], [100, 50], [100, 150], [150, 50], [150, 175]], template: '/templates/shch.png' },
  { id: 28, shape: 'Ъ', points: [[50, 50], [100, 50], [100, 150], [50, 100]], template: '/templates/hard.png' },
  { id: 29, shape: 'Ы', points: [[50, 50], [50, 150], [100, 50], [100, 150], [150, 100]], template: '/templates/yi.png' },
  { id: 30, shape: 'Ь', points: [[50, 50], [50, 150], [100, 50], [100, 100]], template: '/templates/soft.png' },
  { id: 31, shape: 'Э', points: [[150, 50], [50, 100], [150, 150], [100, 100]], template: '/templates/eh.png' },
  { id: 32, shape: 'Ю', points: [[50, 50], [50, 150], [100, 100], [150, 50], [150, 150]], template: '/templates/yu.png' },
  { id: 33, shape: 'Я', points: [[50, 50], [50, 150], [100, 100], [150, 50]], template: '/templates/ya.png' },
  { id: 34, shape: '0', points: [[50, 100], [100, 50], [150, 100], [100, 150]], template: '/templates/0.png' },
  { id: 35, shape: '1', points: [[100, 50], [100, 150]], template: '/templates/1.png' },
  { id: 36, shape: '2', points: [[50, 50], [150, 50], [150, 100], [50, 100], [50, 150], [150, 150]], template: '/templates/2.png' },
  { id: 37, shape: '3', points: [[50, 50], [150, 50], [100, 100], [150, 150], [50, 150]], template: '/templates/3.png' },
  { id: 38, shape: '4', points: [[50, 50], [50, 100], [150, 100], [100, 50], [100, 150]], template: '/templates/4.png' },
  { id: 39, shape: '5', points: [[50, 50], [150, 50], [50, 100], [150, 100], [50, 150]], template: '/templates/5.png' },
  { id: 40, shape: '6', points: [[50, 50], [150, 50], [50, 100], [150, 100], [50, 150], [150, 150]], template: '/templates/6.png' },
  { id: 41, shape: '7', points: [[50, 50], [150, 50], [50, 150]], template: '/templates/7.png' },
  { id: 42, shape: '8', points: [[50, 50], [150, 50], [100, 100], [50, 150], [150, 150]], template: '/templates/8.png' },
  { id: 43, shape: '9', points: [[50, 50], [150, 50], [150, 100], [50, 100], [150, 150]], template: '/templates/9.png' }
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
    if (newStars % 5 === 0) {
      alert('Молодец! Ты собрал 5 звёзд! 🌟');
    }
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
            Обводи буквы и цифры
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
