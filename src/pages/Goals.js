import React, { useEffect, useState } from "react";
import "./Goals.css";

function Goals() {
  const [goals, setGoals] = useState(()=> {
    const s = localStorage.getItem("goals_list"); return s ? JSON.parse(s) : [];
  });
  const [text, setText] = useState("");

  useEffect(()=> { localStorage.setItem("goals_list", JSON.stringify(goals)); }, [goals]);

  const addGoal = () => {
    if (!text.trim()) return;
    setGoals(prev => [{ text: text.trim(), done:false, id:Date.now() }, ...prev]);
    setText("");
  };

  const toggle = (i) => {
    const copy = [...goals]; copy[i].done = !copy[i].done; setGoals(copy);
  };

  const remove = (i) => {
    const copy = [...goals]; copy.splice(i,1); setGoals(copy);
  };

  const onKey = (e) => { if (e.key === "Enter") addGoal(); };

  return (
    <div className="goals-container">
      <h2>🎯 Goals</h2>
      <div className="goals-input">
        <input placeholder="Add goal (Enter to add)" value={text} onChange={e=>setText(e.target.value)} onKeyDown={onKey}/>
        <button onClick={addGoal}>Add</button>
      </div>

      <ul className="goals-list">
        {goals.map((g, idx)=>(
          <li key={g.id || idx} className={g.done ? "done" : ""}>
            <label>
              <input type="checkbox" checked={g.done} onChange={()=>toggle(idx)}/>
              <span className="goal-text">{g.text}</span>
            </label>
            <button onClick={()=>remove(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;
