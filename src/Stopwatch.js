// src/Stopwatch.js
import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startStopHandler = () => {
    setIsRunning(prevState => !prevState);
  };

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{formatTime(time)}</p>
      <button onClick={startStopHandler}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={resetHandler} disabled={!time && !isRunning}>
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
