import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running, time]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, done: false, dueDate: dateInput }]);
    setInput("");
    setDateInput("");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span className="cap">🎓</span> Study<span>Sprint</span>
        </h1>
        <p className="subtitle">
          Organize your study tasks, track progress, and stay focused.
        </p>
        <div className="line"></div>
      </header>

      <main className="grid">
        <section className="card">
          <div className="section-title">
            <div className="icon-box">📋</div>
            <div>
              <h2>Task Manager</h2>
              <p>
                Completed:{" "}
                <span className="blue">
                  {tasks.filter((task) => task.done).length} / {tasks.length}
                </span>
              </p>
            </div>
          </div>

          <div className="task-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter task"
            />
            <input
              type="date"
              className="date-picker"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
            <button onClick={addTask}>Add</button>
          </div>

          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <button className="trash" onClick={() => deleteTask(index)}>
                  🗑️
                </button>
                <button
                  className={task.done ? "check active" : "check"}
                  onClick={() => toggleTask(index)}
                >
                  ✓
                </button>
                <span className={task.done ? "done" : ""}>{task.text}</span>
                {task.dueDate && (
                  <span className="due-date">📅 {formatDate(task.dueDate)}</span>
                )}
              </li>
            ))}
          </ul>

          <p className="task-footer">
            {tasks.length === 0
              ? "📝 No tasks yet. Add one to get started!"
              : "📈 Keep going! You're making progress."}
          </p>
        </section>

        <section className="card timer-card">
          <div className="section-title">
            <div className="icon-box">⏱</div>
            <div>
              <h2>Study Timer</h2>
              <p>Stay focused and make the most of your study time.</p>
            </div>
          </div>
          <div className="timer-circle">
            <h3>{formatTime(time)}</h3>
            <p>⏱ Focus</p>
          </div>
          <div className="timer-buttons">
            <button onClick={() => setRunning(true)}>▷ Start</button>
            <button onClick={() => setRunning(false)}>Ⅱ Pause</button>
            <button onClick={() => { setTime(25 * 60); setRunning(false); }}>↻ Reset</button>
          </div>
        </section>
      </main>

      <footer>
        <span className="footer-icon">⭐</span>
        Stay focused, keep learning, and achieve your goals! 🚀
      </footer>
    </div>
  );
}

export default App;