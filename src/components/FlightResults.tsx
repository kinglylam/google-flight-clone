import React from "react";
import { Flight } from "../services/skyScrapper";
import { Box, Text, Stack } from "@chakra-ui/react";

const FlightResults: React.FC<{ flights: Flight[] }> = ({ flights }) => {
  if (!flights.length) return <Text mt={4}>No flights found</Text>;

  return (
    <Stack spacing={3} mt={4}>
      {flights.map((f) => (
        <Box key={f.id} p={3} borderWidth={1} borderRadius="md">
          <Text fontWeight="bold">{f.airline}</Text>
          <Text>
            {f.departure} → {f.arrival}
          </Text>
          <Text color="blue.600">${f.price}</Text>
        </Box>
      ))}
    </Stack>
  );
};

export default FlightResults;
