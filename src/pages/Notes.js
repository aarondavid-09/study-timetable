import React, { useEffect, useState } from "react";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState(() => {
    const s = localStorage.getItem("notes_list");
    return s ? JSON.parse(s) : [];
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("notes_list", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    setNotes(prev => [{text: text.trim(), time: Date.now()}, ...prev]);
    setText("");
  };

  const removeNote = (i) => {
    const copy = [...notes];
    copy.splice(i,1);
    setNotes(copy);
  };

  const onKey = (e) => { if (e.key === "Enter") addNote(); };

  return (
    <div className="notes-container">
      <h2>📝 Notes</h2>
      <div className="notes-input">
        <input placeholder="Write a note (Enter to add)" value={text} onChange={e=>setText(e.target.value)} onKeyDown={onKey}/>
        <button onClick={addNote}>Add</button>
      </div>

      <ul className="notes-list">
        {notes.map((n, idx) => (
          <li key={idx}>
            <div className="note-text">{n.text}</div>
            <div className="note-meta">
              <small>{new Date(n.time).toLocaleString()}</small>
              <button onClick={()=>removeNote(idx)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
