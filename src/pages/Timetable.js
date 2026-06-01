import React, { useEffect, useState } from "react";
import "./Timetable.css";

function Timetable() {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("tt_subjects");
    return saved ? JSON.parse(saved) : [];
  });
  const [newSubject, setNewSubject] = useState("");
  const [topicInput, setTopicInput] = useState({});

  useEffect(() => {
    localStorage.setItem("tt_subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!newSubject.trim()) return;
    setSubjects(prev => [...prev, { name: newSubject.trim(), topics: [] }]);
    setNewSubject("");
  };

  const onSubjectKey = (e) => {
    if (e.key === "Enter") addSubject();
  };

  const addTopic = (index) => {
    const txt = (topicInput[index] || "").trim();
    if (!txt) return;
    const copy = JSON.parse(JSON.stringify(subjects));
    copy[index].topics.push({ text: txt, completed: false });
    setSubjects(copy);
    setTopicInput(prev => ({ ...prev, [index]: "" }));
  };

  const onTopicKey = (e, idx) => {
    if (e.key === "Enter") addTopic(idx);
  };

  const toggleTopic = (sIdx, tIdx) => {
    const copy = JSON.parse(JSON.stringify(subjects));
    copy[sIdx].topics[tIdx].completed = !copy[sIdx].topics[tIdx].completed;
    setSubjects(copy);
  };

  const removeSubject = (sIdx) => {
    const copy = [...subjects];
    copy.splice(sIdx,1);
    setSubjects(copy);
  };

  const removeTopic = (sIdx, tIdx) => {
    const copy = JSON.parse(JSON.stringify(subjects));
    copy[sIdx].topics.splice(tIdx,1);
    setSubjects(copy);
  };

  const progressOf = (topics) => {
    if (!topics || topics.length === 0) return 0;
    const done = topics.filter(t=>t.completed).length;
    return Math.round((done/topics.length)*100);
  };

  // overall progress
  const overall = (() => {
    const total = subjects.reduce((acc,s)=>acc + s.topics.length,0);
    if (total === 0) return 0;
    const done = subjects.reduce((acc,s)=> acc + s.topics.filter(t=>t.completed).length, 0);
    return Math.round((done/total)*100);
  })();

  return (
    <div className="timetable">
      <h2>📚 Study Timetable</h2>

      <div className="add-subject">
        <input
          placeholder="New subject (press Enter to add)"
          value={newSubject}
          onChange={e => setNewSubject(e.target.value)}
          onKeyDown={onSubjectKey}
        />
        <button onClick={addSubject}>Add</button>
      </div>

      <div className="overall-progress">Overall progress: {overall}%</div>

      <div className="subjects-grid">
        {subjects.map((s, sIdx)=>(
          <div className="subject-card" key={sIdx}>
            <div className="subject-header">
              <h3>{s.name}</h3>
              <div className="subject-actions">
                <button className="del-sub" onClick={()=>removeSubject(sIdx)}>Delete</button>
              </div>
            </div>

            <div className="progress-bar">
              <div className="progress" style={{width:`${progressOf(s.topics)}%`}} />
            </div>
            <div className="progress-percent">{progressOf(s.topics)}% completed</div>

            <ul className="topics-list">
              {s.topics.map((t, tIdx) => (
                <li key={tIdx} className={t.completed ? "topic done" : "topic"}>
                  <label>
                    <input type="checkbox" checked={t.completed} onChange={()=>toggleTopic(sIdx,tIdx)} />
                    <span className="topic-text">{t.text}</span>
                  </label>
                  <button className="del-topic" onClick={()=>removeTopic(sIdx,tIdx)}>✖</button>
                </li>
              ))}
            </ul>

            <div className="add-topic">
              <input
                placeholder="Add topic (Enter)"
                value={topicInput[sIdx] || ""}
                onChange={e => setTopicInput(prev=>({...prev,[sIdx]: e.target.value}))}
                onKeyDown={(e)=>onTopicKey(e,sIdx)}
              />
              <button onClick={()=>addTopic(sIdx)}>Add Topic</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timetable;
