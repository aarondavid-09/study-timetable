import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TimerProvider } from "./contexts/TimerContext";
import "./components/Navbar.css";
import "./pages/Timetable.css";
import "./pages/Timer.css";
import "./pages/Notes.css";
import "./pages/Goals.css";
import "./pages/Calendar.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </React.StrictMode>
);
