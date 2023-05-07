import React from "react";
import { HomePage } from "./components/pages/homepage/HomePage";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { TrackerPage } from "./components/pages/tracker/Tracker";
import { Login } from "./components/pages/login/Login";
import NewCharacter from "./components/pages/newcharacter/NewCharacter";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/new" element={<NewCharacter />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
