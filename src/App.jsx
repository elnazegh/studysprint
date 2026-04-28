import { useState, useEffect } from "react";

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
    if (!input) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (i) => {
    const newTasks = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
   <div className="app">
      <h1>StudySprint</h1>
      <p className="subtitle">
  Organize your study tasks, track progress, and stay focused.
</p>
<div className="card">
      <h2>Task Manager</h2>
      <p>
  Completed: {tasks.filter((task) => task.done).length} / {tasks.length}
</p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            <span
              onClick={() => toggleTask(i)}
              style={{
                textDecoration: task.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(i)}>❌</button>
          </li>
        ))}
      </ul>
      </div>
<div className="card">
      <h2>Study Timer</h2>
      <h3>{formatTime(time)}</h3>
      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Pause</button>
      <button onClick={() => setTime(25 * 60)}>Reset</button>
    </div>
    </div>
  );
}

export default App;