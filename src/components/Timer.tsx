import React, { useState, useEffect, useRef } from "react";
import { Box, Text } from "ink";
import fs from "fs";
import type Quiz from "../types/quiz.js";
import formatSeconds from "../utils/format-seconds.js";

const Timer = ({ quiz, quizPath }: { quiz: Quiz; quizPath: string }) => {
  const [seconds, setSeconds] = useState(0);
  const secondsRef = useRef(0);

  useEffect(() => {
    const secondInterval = setInterval(() => {
      setSeconds(prev => {
        secondsRef.current = prev + 1; // so we have the latest value in the save intervals
        return prev + 1;
      });
    }, 1000);

    saveSeconds(); // save 0 on mount
    const saveInterval = setInterval(saveSeconds, 5000);

    return () => {
      clearInterval(secondInterval);
      clearInterval(saveInterval);

      saveSeconds(); // save final time on unmount
    };
  }, []);

  function saveSeconds() {
    quiz.secondsElapsed = secondsRef.current;
    fs.writeFileSync(quizPath, JSON.stringify(quiz));
  }

  return <Text>{formatSeconds(seconds)}</Text>;
};

export default Timer;
