import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ flexGrow: 1 }}>
        <Dashboard />
      </Box>
    </Provider>
  );
}

export default App;
