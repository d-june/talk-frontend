import React from "react";
import { Auth, Home } from "./pages";
import { Route, Routes } from "react-router-dom";
import { RegisterForm } from "./components";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/im" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
