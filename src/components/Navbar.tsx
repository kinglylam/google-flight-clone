import React from "react";
import { Box, Flex, Heading, Button, Spacer, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex p={4} bg="blue.600" color="white" align="center">
      <Heading size="md">✈️ SkyClone</Heading>
      <Spacer />
      <HStack spacing={6}>
        <NavLink to="/">
          <Button variant="link" color="white">
            Flights
          </Button>
        </NavLink>
        <NavLink to="/hotels">
          <Button variant="link" color="white">
            Hotels
          </Button>
        </NavLink>
        <NavLink to="/cars">
          <Button variant="link" color="white">
            Cars
          </Button>
        </NavLink>
      </HStack>
    </Flex>
  );
};

export default Navbar;
