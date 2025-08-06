import { Container, Heading } from "@chakra-ui/react";
import FlightSearch from "../components/FlightSearch";

const Flights = () => (
  <Container maxW="container.lg" py={8}>
    <Heading mb={6} textAlign="center">
      Search, Compare Flights & Save
    </Heading>
    <FlightSearch />
  </Container>
);

export default Flights;
