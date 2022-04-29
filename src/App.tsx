import React, { useContext } from "react";
import { HomePage } from "./components/pages/HomePage";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { TrackerPage } from "./components/pages/Tracker";
import { AppContext } from "./AppContextProvider";
function App() {
  const { Characters } = useContext(AppContext);
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={""} />
          <Route
            path="/tracker"
            element={<TrackerPage Characters={Characters} />}
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
