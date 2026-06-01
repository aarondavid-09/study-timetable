import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="navbar-title">Study Timetable</h1>
      </div>
      <div className="nav-links">
        <NavLink to="/" className="nav-button">Timetable</NavLink>
        <NavLink to="/timer" className="nav-button">Timer</NavLink>
        <NavLink to="/notes" className="nav-button">Notes</NavLink>
        <NavLink to="/goals" className="nav-button">Goals</NavLink>
        <NavLink to="/calendar" className="nav-button">Calendar</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
