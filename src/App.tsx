import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotel";
import Cars from "./pages/Cars";

const App: React.FC = () => (
  <Box>
    <Navbar />
    <Routes>
      <Route path="/" element={<Flights />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/cars" element={<Cars />} />
    </Routes>
  </Box>
);

export default App;
