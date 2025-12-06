import React, { useEffect, useState } from "react";
import { useStdout } from "ink";

export default function useWindowSize() {
  const { stdout } = useStdout();
  const [size, setSize] = useState<[number, number]>([stdout.columns, stdout.rows]);

  useEffect(() => {
    const handler = () => setSize([stdout.columns, stdout.rows]);

    stdout.on("resize", handler);

    return () => {
      stdout.off("resize", handler);
    };
  }, [stdout]);

  return size;
}
