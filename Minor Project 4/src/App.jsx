import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (taskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addOrUpdateNote = () => {
    if (noteText.trim() === "") return;

    if (editId) {
      setNotes(
        notes.map((note) =>
          note.id === editId ? { ...note, text: noteText } : note
        )
      );
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        text: noteText,
      };
      setNotes([...notes, newNote]);
    }

    setNoteText("");
  };

  const editNote = (note) => {
    setNoteText(note.text);
    setEditId(note.id);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="container">
      <h1>To-Do App + Notes App</h1>

      <div className="section">
        <h2>To-Do App</h2>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter a task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        {tasks.map((task) => (
          <div className="item" key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              className={task.completed ? "completed" : ""}
            >
              {task.text}
            </span>

            <p>Status: {task.completed ? "Completed" : "Pending"}</p>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Notes App</h2>

        <textarea
          placeholder="Write your note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>

        <button onClick={addOrUpdateNote}>
          {editId ? "Update Note" : "Add Note"}
        </button>

        {notes.map((note) => (
          <div className="item" key={note.id}>
            <p>{note.text}</p>
            <button onClick={() => editNote(note)}>Edit</button>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;