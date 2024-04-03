import React from "react";
import { MyContextProvider } from "./context/Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <MyContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MyContextProvider>
    </Router>
  );
};

export default App;
