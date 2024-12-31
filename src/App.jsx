import { useState } from "react";
import Welcome from "./components/Welcome";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Welcome} />
          <Route path="/chat" Component={Chat} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
