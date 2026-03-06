import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../services/taskservice";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
    priority: "MEDIUM",
    dueDate: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    let cancelled = false;
    getTasks().then((res) => {
      if (!cancelled) setTasks(res.data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      status: "PENDING",
      priority: "MEDIUM",
      dueDate: "",
    });
    setEditingId(null);
  };

  const handleCreate = async () => {
    if (!form.title) return alert("Title required");
    if (editingId) {
      await updateTask(editingId, form);
    } else {
      await createTask(form);
    }
    resetForm();
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    if (editingId === id) {
      resetForm();
    }
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "PENDING",
      priority: task.priority || "MEDIUM",
      dueDate: task.dueDate || "",
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <div className="topbar">
        <div>
          <h1>TaskFlow Dashboard</h1>
          <p>Plan your work and keep progress clear.</p>
        </div>
        <button className="btn btn-ghost" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="grid">
        <section className="panel">
          <h2>{editingId ? "Edit Task" : "Create Task"}</h2>

          <div className="input-group">
            <label className="input-label">Title</label>
            <input
              className="app-input"
              placeholder="Ex: Build deployment docs"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea
              className="app-textarea"
              placeholder="Task details"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="two-col">
            <div className="input-group">
              <label className="input-label">Status</label>
              <select
                className="app-select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Priority</label>
              <select
                className="app-select"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Due Date</label>
            <input
              className="app-input"
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>

          <div className="two-col">
            <button className="btn btn-primary" onClick={handleCreate}>
              {editingId ? "Save Update" : "Add Task"}
            </button>
            {editingId && (
              <button className="btn btn-ghost" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </section>

        <section className="panel">
          <h2>Your Tasks ({tasks.length})</h2>
          <div className="task-list">
            {tasks.length === 0 ? (
              <p className="muted">No tasks yet. Create your first task.</p>
            ) : (
              tasks.map((task) => (
                <article key={task.id} className="task-card">
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-meta">{task.description || "No description"}</p>
                  <div className="badge-row">
                    <span className="badge status">{task.status}</span>
                    <span className="badge priority">{task.priority}</span>
                    <span className="badge">Due: {task.dueDate || "-"}</span>
                  </div>
                  <div className="task-actions">
                    <button className="btn btn-ghost" onClick={() => handleEdit(task)}>
                      Edit
                    </button>
                    {" "}
                    <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
