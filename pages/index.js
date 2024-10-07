import React, { useState, useEffect, useRef } from 'react';
import TypingTest from '../components/TypingTest';
import Stats from '../components/Stats';
import Header from '../components/Header';
import Modal from '../components/Modal';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [time, setTime] = useState(0);
  const [textArray, setTextArray] = useState([]);
  const [inputText, setInputText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completed, setCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ wpm: 0, accuracy: 100, time: 0 });
  const inputRef = useRef(null);
  const totalErrorsRef = useRef(0);
  const totalTypedRef = useRef(0);

  const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "Every developer needs to test their typing speed regularly.",
    "JavaScript and React are popular for web development.",
    "Tailwind CSS simplifies creating responsive designs.",
    "Typing fast improves productivity and efficiency.",
  ];

  const startTest = () => {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setTextArray(randomText.split(''));
    setStarted(true);
    setTime(0);
    setInputText('');
    setAccuracy(100);
    setCompleted(false);
    setShowModal(false);
    setShowWelcome(false);
    totalErrorsRef.current = 0;
    totalTypedRef.current = 0;
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const calculateAccuracy = (input, target) => {
    const currentLength = input.length;
    let currentErrors = 0;

    for (let i = 0; i < currentLength; i++) {
      if (input[i] !== target[i]) {
        currentErrors++;
      }
    }

    totalTypedRef.current = Math.max(totalTypedRef.current, currentLength);
    totalErrorsRef.current += currentErrors;

    return totalTypedRef.current === 0 ? 100 : 
      Math.max(0, 100 - (totalErrorsRef.current / totalTypedRef.current * 100));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    const currentAccuracy = calculateAccuracy(value, textArray.join(''));
    setAccuracy(Number(currentAccuracy.toFixed(2)));

    if (value === textArray.join('')) {
      setCompleted(true);
      setStarted(false);
    }
  };

  useEffect(() => {
    if (started && !completed) {
      const timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [started, completed]);

  useEffect(() => {
    if (started && !completed) {
      const words = inputText.trim().split(' ').length;
      const minutes = time / 60;
      const calculatedWpm = minutes > 0 ? (words / minutes).toFixed(2) : 0;
      setWpm(calculatedWpm);
    }
  }, [inputText, time, started, completed]);

  useEffect(() => {
    if (completed) {
      setModalData({ wpm, accuracy, time });
      setShowModal(true);
    }
  }, [completed, wpm, accuracy, time]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRetake = () => {
    closeModal();
    startTest();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black">
      <Header startTest={startTest} isTestStarted={started} isTestCompleted={completed} />
      {showWelcome && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Welcome to the Typing Speed Test</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Click the button below to start the test</p>
          <button
            onClick={startTest}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Start Test
          </button>
        </div>
      )}
      {!showWelcome && (
        <main className="container mx-auto p-4">
          <TypingTest
            textArray={textArray}
            inputText={inputText}
            handleChange={handleChange}
            started={started}
            completed={completed}
            inputRef={inputRef}
          />
          {started && !completed && <Stats wpm={wpm} accuracy={accuracy} time={time} />}
          <Modal 
            show={showModal} 
            onClose={closeModal} 
            onRetake={handleRetake}
            wpm={modalData.wpm} 
            accuracy={modalData.accuracy} 
            time={modalData.time} 
          />
        </main>
      )}
    </div>
  );
}