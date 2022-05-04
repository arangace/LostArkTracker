import React, { useContext } from "react";
import { HomePage } from "./components/pages/HomePage";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { TrackerPage } from "./components/pages/Tracker";
import { AppContext } from "./AppContextProvider";
import { Login } from "./components/pages/Login";
import NewCharacter from "./components/pages/NewCharacter";
function App() {
  return (
    <>
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
    </>
  );
}

export default App;
