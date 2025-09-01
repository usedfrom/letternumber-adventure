import React, { useState } from 'react';

const LetterGame = ({ letters, addStar, onBack }) => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [feedback, setFeedback] = useState('');

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleAnswer = (selected) => {
    if (selected === letters[currentLetter].letter) {
      setFeedback('Молодец! 🌟');
      addStar();
      playSound(letters[currentLetter].sound);
      setTimeout(() => {
        if (currentLetter + 1 < letters.length) {
          setCurrentLetter(currentLetter + 1);
          setFeedback('');
        } else {
          setFeedback('Ты выучил все буквы!');
        }
      }, 1000);
    } else {
      setFeedback('Попробуй ещё раз!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
      <h2 className="text-2xl font-semibold mb-4">Угадай букву!</h2>
      <img
        src={letters[currentLetter].image}
        alt="letter"
        className="w-32 h-32 mx-auto mb-4"
      />
      <p className="text-xl mb-4">Какая это буква?</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {letters.map((letter) => (
          <button
            key={letter.id}
            onClick={() => handleAnswer(letter.letter)}
            className="bg-blue-500 text-white text-2xl p-4 rounded-lg"
          >
            {letter.letter}
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

export default LetterGame;