import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Dashboard />
    </Box>
  );
}

export default App;
