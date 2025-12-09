import { useInput, measureElement, BoxProps, DOMElement } from "ink";
import React, { useState, useMemo, useEffect } from "react";
import { BOX, SIDE_PANEL } from "../constants/grid.js";
import useWindowSize from "./useWindowSize.js";

interface Position {
  row: number;
  col: number;
}

export default function useQuestionGridNavigator(
  numQuestions: number,
  componentRef: React.RefObject<null>
) {
  const [windowCols, windowRows] = useWindowSize();
  const [[cols, rows], setGridSize] = useState<[number, number]>([0, 0]);

  const colsLastRow = numQuestions % cols || cols;
  const [pos, setPos] = useState<Position>({ row: 0, col: 0 });

  //FIXME
  useEffect(() => {
    const { width, height } = measureElement(componentRef.current!);
    // console.log(`measured width: ${width - 1} calc: ${(width - 1) / BOX.WIDTH}`);
    const calculatedCols = Math.floor((width - 4) / BOX.WIDTH);

    setGridSize(() => [calculatedCols, Math.ceil(numQuestions / calculatedCols)]);
  }, [windowCols]);

  useInput((input, key) => {
    if (key.return) {
      setPos(p => {
        const lastQuestion = getQuestionNum() == numQuestions - 1;
        const lastCol = p.col == cols - 1;

        if (lastQuestion) {
          return { row: 0, col: 0 };
        }

        if (lastCol) {
          return { row: p.row + 1, col: 0 };
        }

        return { ...p, col: p.col + 1 };
      });
    }

    if (key.rightArrow) {
      setPos(p => {
        const posLastRow = p.row === rows - 1;
        const posLastColInLastRow = p.col === colsLastRow - 1;

        if ((posLastRow && posLastColInLastRow) || p.col === cols - 1) {
          return { ...p, col: 0 };
        }

        return { ...p, col: p.col + 1 };
      });

      return;
    }

    if (key.leftArrow) {
      setPos(p => {
        const posLastRow = p.row === rows - 1;

        if (p.col == 0) {
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
        const colNotInLastRow = p.col >= colsLastRow;

        if (isLastRow || (isSecondLastRow && colNotInLastRow)) return { ...p, row: 0 };

        return { ...p, row: p.row + 1 };
      });

      return;
    }
  });

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
