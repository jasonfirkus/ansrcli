import React, { useState, useEffect, useRef } from "react";
import { Box, Text } from "ink";
import fs from "fs";
import type Quiz from "../types/quiz.js";
import formatSeconds from "../utils/format-seconds.js";

const Timer = ({ quiz, quizPath }: { quiz: Quiz; quizPath: string }) => {
  const [seconds, setSeconds] = useState(0);
  const secondsRef = useRef(0);
  const minutes = Math.floor(seconds / 60);

  useEffect(() => {
    const secondInterval = setInterval(() => {
      setSeconds(prev => {
        secondsRef.current = prev + 1; // so we have the latest value in the save intervals
        return prev + 1;
      });
    }, 1000);

    const saveInterval = setInterval(() => {
      quiz.secondsElapsed = secondsRef.current;
      fs.writeFileSync(quizPath, JSON.stringify(quiz));
    }, 5000);

    return () => {
      clearInterval(secondInterval);
      clearInterval(saveInterval);
    };
  }, []);

  return <Text>{formatSeconds(seconds)} elapsed</Text>;
};

export default Timer;
