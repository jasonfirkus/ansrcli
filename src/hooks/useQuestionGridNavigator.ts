import { useInput } from "ink";
import React, { useState } from "react";
import { BOX, QUESTION_NAVIGATOR } from "../constants/grid.js";
import useWindowSize from "./useWindowSize.js";

interface Position {
  row: number;
  col: number;
}

export default function useQuestionGridNavigator(numQuestions: number) {
  const [windowCols, windowRows] = useWindowSize();
  const containerWidth = Math.floor(windowCols * QUESTION_NAVIGATOR.WIDTH);
  const [cols, rows] = calcGridSize();
  const colsLastRow = numQuestions % cols || cols;
  const [pos, setPos] = useState<Position>({ row: 0, col: 0 });

  useInput((input, key) => {
    if (key.rightArrow) {
      setPos(p => {
        const posLastRow = p.row === rows - 1;
        const posLastColInLastRow = pos.col === colsLastRow - 1;
        if ((posLastRow && posLastColInLastRow) || pos.col === cols - 1) {
          return { ...p, col: 0 };
        }

        return { ...p, col: p.col + 1 };
      });

      return;
    }

    if (key.leftArrow) {
      setPos(p => {
        const posLastRow = p.row === rows - 1;

        if (pos.col == 0) {
          if (posLastRow) return { ...p, col: colsLastRow - 1 };

          return { ...p, col: cols - 1 };
        }

        return { ...p, col: p.col - 1 };
      });

      return;
    }

    if (key.upArrow) {
      setPos(p => {
        const isFirstRow = p.row === 0;
        const colInLastRow = p.col < colsLastRow;

        if (isFirstRow) {
          if (colInLastRow) {
            return { ...p, row: rows - 1 };
          } else {
            return { ...p, row: rows - 2 };
          }
        }

        return { ...p, row: p.row - 1 };
      });

      return;
    }

    if (key.downArrow) {
      setPos(p => {
        const isLastRow = p.row === rows - 1;
        const isSecondLastRow = p.row === rows - 2;
        const colNotInLastRow = pos.col >= colsLastRow;

        if (isLastRow || (isSecondLastRow && colNotInLastRow)) return { ...p, row: 0 };

        return { ...p, row: p.row + 1 };
      });

      return;
    }
  });

  function calcGridSize(): [number, number] {
    const c = Math.floor(containerWidth / BOX.WIDTH);
    const r = Math.ceil(numQuestions / c);

    return [c, r];
  }

  function indexSelected(index: number) {
    const row = Math.floor(index / cols);
    const col = index % cols;

    return row === pos.row && col === pos.col;
  }

  function getQuestionNum() {
    return pos.row * cols + pos.col;
  }

  return {
    position: pos,
    indexSelected,
    getQuestionNum,
  };
}
