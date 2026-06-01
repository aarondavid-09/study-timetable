import React, { useContext, useEffect, useState } from "react";
import { TimerContext } from "../contexts/TimerContext";
import "./Timer.css";

function Timer() {
  const { timeLeft, isRunning, startTimer, pauseTimer, resetTimer, setTimeByParts, totalRef } = useContext(TimerContext);

  // local inputs for user (strings to allow empty)
  const [hInput, setHInput] = useState("0");
  const [mInput, setMInput] = useState("0");
  const [sInput, setSInput] = useState("0");

  // flashing state
  const [flashing, setFlashing] = useState(false);

  // Format
  const hours = String(Math.floor(timeLeft / 3600)).padStart(2,"0");
  const minutes = String(Math.floor((timeLeft % 3600)/60)).padStart(2,"0");
  const seconds = String(timeLeft % 60).padStart(2,"0");

  // progress ring math
  const maxSeconds = 99*3600 + 59*60 + 59;
  const total = totalRef.current || 0;
  const progressPercent = total > 0 ? ((total - timeLeft) / total) : 0;
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const dashoffset = circ - (circ * progressPercent);

  // flashes + notification when timer reaches 0 (watch timeLeft change)
  useEffect(() => {
    if (timeLeft === 0 && !isRunning && total > 0) {
      // trigger 3 flashes
      let toggles = 0;
      setFlashing(true);
      const fl = setInterval(() => {
        toggles++;
        setFlashing(prev => !prev);
        if (toggles >= 6) {
          clearInterval(fl);
          setFlashing(false);
        }
      }, 500);

      // browser notification
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification("Timer Completed", { body: "⏰ Your timer has completed." });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(perm => {
            if (perm === "granted") {
              new Notification("Timer Completed", { body: "⏰ Your timer has completed." });
            }
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isRunning]);

  const handleSetTime = () => {
    const h = Math.max(0, Math.min(99, Number(hInput || 0)));
    const m = Math.max(0, Math.min(59, Number(mInput || 0)));
    const s = Math.max(0, Math.min(59, Number(sInput || 0)));
    setTimeByParts(h, m, s);
  };

  // Enter key support on inputs
  const onKey = (e) => {
    if (e.key === "Enter") {
      handleSetTime();
    }
  };

  return (
    <div className={`timer-page ${flashing ? "flash" : ""}`}>
      <h2 className="timer-title">⏳ Study Timer</h2>

      <div className="time-inputs">
        <div className="input-col">
          <label>Hours</label>
          <input type="number" min="0" max="99" value={hInput}
                 onChange={e => setHInput(e.target.value)} onKeyDown={onKey} />
        </div>
        <div className="input-col">
          <label>Minutes</label>
          <input type="number" min="0" max="59" value={mInput}
                 onChange={e => setMInput(e.target.value)} onKeyDown={onKey} />
        </div>
        <div className="input-col">
          <label>Seconds</label>
          <input type="number" min="0" max="59" value={sInput}
                 onChange={e => setSInput(e.target.value)} onKeyDown={onKey} />
        </div>
        <div className="set-btn-col">
          <button className="set-btn" onClick={handleSetTime}>Set Time</button>
        </div>
      </div>

      <div className="circle-wrap">
        <svg className="progress-ring" width="140" height="140" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} className="ring-bg" strokeWidth="8" />
          <circle cx="60" cy="60" r={radius}
                  className="ring-progress" strokeWidth="8"
                  strokeDasharray={circ}
                  strokeDashoffset={dashoffset}
                  strokeLinecap="round" />
        </svg>

        <div className="timer-display">
          <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span>
        </div>
      </div>

      <div className="timer-controls">
        <button onClick={startTimer} className="primary" disabled={timeLeft <= 0 || isRunning}>Start</button>
        <button onClick={pauseTimer} className="secondary" disabled={!isRunning}>Pause</button>
        <button onClick={() => resetTimer(false)} className="danger">Reset</button>
        <button onClick={() => resetTimer(true)} className="ghost">Reset to Set</button>
      </div>

    </div>
  );
}

export default Timer;
