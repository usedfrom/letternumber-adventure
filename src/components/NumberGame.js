import React, { useState } from 'react';

const NumberGame = ({ numbers, addStar, onBack }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleAnswer = (selected) => {
    if (selected === numbers[currentNumber].number) {
      setFeedback('Молодец! 🌟');
      addStar();
      setTimeout(() => {
        if (currentNumber + 1 < numbers.length) {
          setCurrentNumber(currentNumber + 1);
          setFeedback('');
        } else {
          setFeedback('Ты выучил все цифры!');
        }
      }, 1000);
    } else {
      setFeedback('Попробуй ещё раз!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
      <h2 className="text-2xl font-semibold mb-4">Сосчитай!</h2>
      <img
        src={numbers[currentNumber].image}
        alt="number"
        className="w-32 h-32 mx-auto mb-4"
      />
      <p className="text-xl mb-4">Сколько здесь объектов?</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {numbers.map((num) => (
          <button
            key={num.id}
            onClick={() => handleAnswer(num.number)}
            className="bg-green-500 text-white text-2xl p-4 rounded-lg"
          >
            {num.number}
          </button>
        ))}
      </div>
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

export default NumberGame;