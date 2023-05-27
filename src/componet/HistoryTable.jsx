import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const HistoryTable = ({ history }) => {
  return (
    <Table box-shadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;" bg="white" boxShadow="lg" borderRadius="md" mt={4} w={"400px"} margin={"auto"}>
      <Thead >
        <Tr >
          <Th bg="coral" color="black" fontWeight="bold" py={2} px={4}>
            WPM
          </Th>
          <Th bg="coral" color="black" fontWeight="bold" py={2} px={4}>
            Accuracy
          </Th>
          <Th bg="coral" color="black" fontWeight="bold" py={2} px={4}>
            Timer
          </Th>
        </Tr>
      </Thead>
      <Tbody bg={"aqua"}>
        {history.map((entry, index) => (
          <Tr key={index}>
            <Td py={2} px={4}>
              {entry.wpm}
            </Td>
            <Td py={2} px={4}>
              {entry.accuracy.toFixed(2)}%
            </Td>
            <Td py={2} px={4}>
              {entry.elapsedTime.toFixed(1)}s
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default HistoryTable;
