import React, { useState, useCallback } from "react";
import {
  Box,
  Input,
  VStack,
  Button,
  Spinner,
  FormControl,
  FormLabel,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import {
  searchAirports,
  fetchFlights,
  Place,
  Flight,
} from "../services/skyScrapper";
import FlightResults from "./FlightResults";

const FlightSearch: React.FC = () => {
  const [fromTerm, setFromTerm] = useState("");
  const [toTerm, setToTerm] = useState("");

  const [fromEntityId, setFromEntityId] = useState("");
  const [toEntityId, setToEntityId] = useState("");
  const [fromSkyId, setFromSkyId] = useState("");
  const [toSkyId, setToSkyId] = useState("");

  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Flight[]>([]);

  const [fromSuggestions, setFromSuggestions] = useState<Place[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Place[]>([]);

  const handleSearch = async () => {
    if (!fromSkyId || !toSkyId || !fromEntityId || !toEntityId || !date) return;

    setLoading(true);
    try {
      const data = await fetchFlights(
        fromSkyId,
        toSkyId,
        fromEntityId,
        toEntityId,
        date
      );
      setResults(data);
    } catch (error) {
      console.error("Flight search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = useCallback(
    async (query: string, setFunc: (places: Place[]) => void) => {
      if (query.length < 2) {
        setFunc([]);
        return;
      }

      try {
        const places = await searchAirports(query);
        setFunc(places);
      } catch (error) {
        console.error("Airport search failed:", error);
        setFunc([]);
      }
    },
    []
  );

  const handleFromSelect = (place: Place) => {
    setFromTerm(`${place.title} (${place.skyId})`);
    setFromEntityId(place.entityId);
    setFromSkyId(place.skyId);
    setFromSuggestions([]);
  };

  const handleToSelect = (place: Place) => {
    setToTerm(`${place.title} (${place.skyId})`);
    setToEntityId(place.entityId);
    setToSkyId(place.skyId);
    setToSuggestions([]);
  };

  return (
    <VStack spacing={4} align="stretch">
      {/* FROM FIELD */}
      <FormControl>
        <FormLabel>From</FormLabel>
        <Input
          value={fromTerm}
          onChange={(e) => {
            const value = e.target.value;
            setFromTerm(value);
            fetchSuggestions(value, setFromSuggestions);
          }}
          placeholder="Enter departure airport"
        />
        {fromSuggestions.length > 0 && (
          <List
            border="1px solid #ccc"
            borderRadius="md"
            mt={1}
            maxH="150px"
            overflowY="auto"
            zIndex={10}
            bg="white"
          >
            {fromSuggestions.map((place) => (
              <ListItem
                key={place.entityId}
                px={3}
                py={2}
                _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
                onClick={() => handleFromSelect(place)}
              >
                <Text>{place.suggestionTitle}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </FormControl>

      {/* TO FIELD */}
      <FormControl>
        <FormLabel>To</FormLabel>
        <Input
          value={toTerm}
          onChange={(e) => {
            const value = e.target.value;
            setToTerm(value);
            fetchSuggestions(value, setToSuggestions);
          }}
          placeholder="Enter destination airport"
        />
        {toSuggestions.length > 0 && (
          <List
            border="1px solid #ccc"
            borderRadius="md"
            mt={1}
            maxH="150px"
            overflowY="auto"
            zIndex={10}
            bg="white"
          >
            {toSuggestions.map((place) => (
              <ListItem
                key={place.entityId}
                px={3}
                py={2}
                _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
                onClick={() => handleToSelect(place)}
              >
                <Text>{place.suggestionTitle}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </FormControl>

      {/* DATE */}
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>

      {/* SEARCH BUTTON */}
      <Button colorScheme="blue" onClick={handleSearch} isDisabled={loading}>
        {loading ? <Spinner size="sm" /> : "Search Flights"}
      </Button>

      {/* RESULTS */}
      <Box>
        <FlightResults flights={results} />
      </Box>
    </VStack>
  );
};

export default FlightSearch;
