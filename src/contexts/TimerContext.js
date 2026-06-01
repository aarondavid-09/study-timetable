import React, { createContext, useState, useRef, useEffect } from "react";

export const TimerContext = createContext();

// TimerProvider (named export)
export function TimerProvider({ children }) {
  // stored values are seconds
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("tm_timeLeft");
    return saved ? Number(saved) : 0;
  });
  const [isRunning, setIsRunning] = useState(false);
  const totalRef = useRef(() => {
    const savedTotal = localStorage.getItem("tm_total");
    return savedTotal ? Number(savedTotal) : 0;
  });
  const intervalRef = useRef(null);

  // persist
  useEffect(() => {
    localStorage.setItem("tm_timeLeft", String(timeLeft));
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("tm_total", String(totalRef.current || 0));
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // reach 0, stop (prevent negative)
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const setTimeByParts = (h, m, s) => {
    const total = Math.min(99*3600 + 59*60 + 59, Math.max(0, Number(h)*3600 + Number(m)*60 + Number(s)));
    totalRef.current = total;
    setTimeLeft(total);
    localStorage.setItem("tm_total", String(total));
    localStorage.setItem("tm_timeLeft", String(total));
  };

  const startTimer = () => {
    // if at 0, don't start
    if (timeLeft <= 0) return;
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);

  const resetTimer = (keepTotal = false) => {
    setIsRunning(false);
    setTimeLeft(keepTotal ? totalRef.current : 0);
    localStorage.setItem("tm_timeLeft", String(keepTotal ? totalRef.current : 0));
  };

  return (
    <TimerContext.Provider value={{
      timeLeft,
      isRunning,
      startTimer,
      pauseTimer,
      resetTimer,
      setTimeByParts,
      totalRef
    }}>
      {children}
    </TimerContext.Provider>
  );
}
