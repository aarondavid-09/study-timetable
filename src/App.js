import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Timetable from "./pages/Timetable";
import Timer from "./pages/Timer";
import Notes from "./pages/Notes";
import Goals from "./pages/Goals";
import CalendarPage from "./pages/CalendarPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Timetable />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
