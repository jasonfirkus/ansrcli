import { Text } from "ink";
import React from "react";
import Spinner from "ink-spinner";

const Loading = ({ message }: { message: string }) => {
  return (
    <Text>
      <Spinner /> {message}
    </Text>
  );
};

export default Loading;
