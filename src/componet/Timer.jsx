import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

const Timer = ({ isTyping }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;

    if (isTyping) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTyping]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Box
      bg="red"
      borderRadius="5px"
      display="inline-block"
      color={"white"} 
      padding={"5px 20px 5px 20px"}
      marginBottom={"-5px"}
    >
      Timer: {formatTime(timeElapsed)}
    </Box>
  );
};

export default Timer;
