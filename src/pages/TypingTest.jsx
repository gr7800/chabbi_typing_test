import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Input, Divider } from "@chakra-ui/react";
import Timer from "../componet/Timer";
import generateWords from "../uttils/wordGenerator";
import HistoryTable from "../componet/HistoryTable";

const TypingTest = () => {
  const [words, setWords] = useState(generateWords());
  const [startTime, setStartTime] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [incorrectKeystrokes, setIncorrectKeystrokes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputColors, setInputColors] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isTyping && startTime === null) {
      setStartTime(Date.now());
    }
  }, [isTyping, startTime]);

  useEffect(() => {
    if (typedText === words) {
      resetState();
      updateHistory();
    }
  }, [typedText, words]);

  const resetState = () => {
    setWords(generateWords());
    setTypedText("");
    setCorrectKeystrokes(0);
    setIncorrectKeystrokes(0);
    setStartTime(null);
    setIsTyping(false);
    setInputColors([]);
  };

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setTypedText(inputText);
    setIsTyping(inputText.length > 0);
    const newInputColors = [];

    if (inputText === words) {
      resetState();
      updateHistory();
    } else {
      for (let i = 0; i < inputText.length; i++) {
        const typedChar = inputText[i];
        if (i < words.length) {
          if (typedChar === words[i]) {
            newInputColors.push("");
            setCorrectKeystrokes((prevCount) => prevCount + 1);
          } else {
            newInputColors.push("red");
            setIncorrectKeystrokes((prevCount) => prevCount + 1);
          }
        } else {
          newInputColors.push("red");
        }
      }
    }

    setInputColors(newInputColors);
  };

  const accuracy =
    (correctKeystrokes / (correctKeystrokes + incorrectKeystrokes + 0.01)) * 100;

  const wpm = Math.floor(
    typedText.length / 5 / ((Date.now() - startTime) / 1000 / 60)
  );

  const updateHistory = () => {
    const timestamp = new Date().toLocaleString();
    const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
    const newHistory = [
      ...history,
      { wpm, accuracy, timestamp, elapsedTime },
    ];
    if (newHistory.length > 5) {
      newHistory.shift();
    }
    setHistory(newHistory);
  };

  return (
    <Box bg={"gray.200"} h={"100vh"}>
      <Heading as="h1" mb={4} bg={"coral"} p={"10px"} border={"2px solid red"} borderRadius={"md"} box-shadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;">
        Touch Typing App
      </Heading>
      <Box w={"400px"} margin={"auto"}>
        <Text className="random" margin={"auto"} mb={4} bg="aqua" box-shadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;" padding={"20px"} borderRadius={"15px"} w={"325px"}>
          {words}
        </Text>
        <Input
          type="text"
          value={typedText}
          border={"2px solid red"}
          bg={"gray.300"}
          color={"black"}
          fontWeight={"bold"}
          onChange={handleInputChange}
          placeholder="Start typing..."
          style={{
            backgroundColor: inputColors.join(" "),
          }}
          mb={4}
        />
        <Timer isTyping={isTyping} />
        <Box bg={"red"} borderRadius={"md"} w={"200px"} margin={"auto"} color={"white"}>
          <Text>Accuracy: {accuracy.toFixed(2)}%</Text>
          <Text>WPM: {wpm}</Text>
        </Box>
      </Box>
      <Divider color={"red"} mt={"10px"} h={"2px"} bg={"red"} />
      <Heading as="h2" mt={4} mb={2}>
        History
      </Heading>
      <HistoryTable history={history} />
    </Box>
  );
};

export default TypingTest;
