'use client';

import React, { useState } from 'react';
import styles from './RiddleDisplay.module.css'; // CSS Module import

interface RiddleDisplayProps {
  riddle: string;
  answer: string;
  onCorrect: () => void;
  onWrong: () => void;
  language: 'english' | 'amharic';
}

const RiddleDisplay: React.FC<RiddleDisplayProps> = ({ riddle, answer, onCorrect, onWrong, language }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim().toLowerCase() === answer.toLowerCase()) {
      onCorrect();
    } else {
      onWrong();
    }
    setUserAnswer('');
  };

  return (
    <div className={styles.riddleContainer}>
      <h2 className={`${styles.riddleText} ${language === 'amharic' ? styles.amharic : ''}`}>
        {riddle}
      </h2>
      <form onSubmit={handleSubmit} className={styles.riddleForm}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer..."
          className={styles.riddleInput}
        />
        <button type="submit" className={styles.riddleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RiddleDisplay;
