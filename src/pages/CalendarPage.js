import React, { useEffect, useState } from "react";
import "./Calendar.css";

function CalendarPage() {
  const [date, setDate] = useState(() => {
    const s = localStorage.getItem("cal_selected"); return s ? s : new Date().toISOString().slice(0,10);
  });
  const [events, setEvents] = useState(() => {
    const s = localStorage.getItem("cal_events"); return s ? JSON.parse(s) : {};
  });
  const [input, setInput] = useState("");

  useEffect(()=> { localStorage.setItem("cal_selected", date); }, [date]);
  useEffect(()=> { localStorage.setItem("cal_events", JSON.stringify(events)); }, [events]);

  const addEvent = () => {
    if (!input.trim()) return;
    const copy = {...events};
    copy[date] = copy[date] ? [...copy[date], {text:input, time:Date.now()}] : [{text:input, time:Date.now()}];
    setEvents(copy); setInput("");
  };

  const removeEvent = (i) => {
    const copy = {...events};
    copy[date].splice(i,1);
    if (copy[date].length === 0) delete copy[date];
    setEvents(copy);
  };

  const evtList = events[date] || [];

  return (
    <div className="calendar-container">
      <h2>📅 Calendar</h2>

      <div className="calendar-controls">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>

      <div className="calendar-add">
        <input placeholder="Add event for selected date" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter') addEvent(); }} />
        <button onClick={addEvent}>Add</button>
      </div>

      <div className="events-list">
        <h3>Events on {new Date(date).toDateString()}</h3>
        {evtList.length === 0 ? <p className="muted">No events</p> : (
          <ul>
            {evtList.map((ev,i)=>(
              <li key={i}>
                <div>{ev.text}</div>
                <div className="evt-meta">
                  <small>{new Date(ev.time).toLocaleTimeString()}</small>
                  <button onClick={()=>removeEvent(i)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
