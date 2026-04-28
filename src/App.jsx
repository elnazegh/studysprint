import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
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
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="app">
      <header>
        <h1>🎓 Study<span>Sprint</span></h1>
        <p className="subtitle">
          Organize your study tasks, track progress, and stay focused.
        </p>
      </header>

      <main className="grid">
        <section className="card">
          <h2>📋 Task Manager</h2>
          <p className="progress">
            Completed: {tasks.filter((task) => task.done).length} / {tasks.length}
          </p>

          <div className="task-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter task"
            />
            <button onClick={addTask}>Add</button>
          </div>

          <ul>
            {tasks.length === 0 && <p className="empty">No tasks yet!</p>}

            {tasks.map((task, index) => (
              <li key={index}>
                <span
                  onClick={() => toggleTask(index)}
                  className={task.done ? "done" : ""}
                >
                  {task.text}
                </span>
                <button className="delete" onClick={() => deleteTask(index)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="card timer-card">
          <h2>⏱ Study Timer</h2>
          <p className="small-text">Stay focused and make the most of your study time.</p>

          <div className="timer-circle">
            <h3>{formatTime(time)}</h3>
            <p>Focus</p>
          </div>

          <div>
            <button onClick={() => setRunning(true)}>▶ Start</button>
            <button onClick={() => setRunning(false)}>⏸ Pause</button>
            <button onClick={() => setTime(25 * 60)}>↻ Reset</button>
          </div>
        </section>
      </main>

      <footer>
        ⭐ Stay focused, keep learning, and achieve your goals! 🚀
      </footer>
    </div>
  );
}

export default App;