import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/dashboard.css";
const STATUS_CONFIG = {
  TODO: { label: "To Do", color: "#1B4332", bg: "#DCF3DC", dot: "#4B8B6C" },
  IN_PROGRESS: { label: "In Progress", color: "#7a4f00", bg: "#fff3d6", dot: "#e6a817" },
  DONE: { label: "Done", color: "#1B4332", bg: "#A7C5BD", dot: "#1B4332" },
};

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState({ title: "", description: "", status: "TODO" });
  const [editingTask, setEditingTask] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", status: "TODO" });
  const [filter, setFilter] = useState("ALL");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Unauthorized or error");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAddTask = async () => {
    try {
      await API.post("/tasks", taskData);
      toast.success("Task added");
      setTaskData({ title: "", description: "", status: "TODO" });
      fetchTasks();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  const confirmDelete = (id) => {
    toast((t) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p style={{ fontSize: "13px", color: "#1B4332", fontWeight: "500", margin: 0 }}>
          Delete this task?
        </p>
        <p style={{ fontSize: "12px", color: "#7a8c85", margin: 0, fontWeight: "300" }}>
          This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => { toast.dismiss(t.id); deleteTask(id); }}
            style={{
              background: "#1B4332", color: "#DCF3DC", border: "none",
              padding: "7px 16px", borderRadius: "7px", cursor: "pointer",
              fontSize: "12px", fontWeight: "500", fontFamily: "DM Sans, sans-serif",
            }}
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              background: "transparent", border: "1.5px solid #e0d9cf",
              color: "#6b7c75", padding: "7px 16px", borderRadius: "7px",
              cursor: "pointer", fontSize: "12px", fontWeight: "500",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 6000, style: { padding: "16px", borderRadius: "12px", border: "1px solid #e0d9cf" } });
  };

  const updateTask = async () => {
    try {
      await API.put(`/tasks/${editingTask.taskId}`, editData);
      toast.success("Task updated");
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredTasks = tasks.filter((t) => filter === "ALL" ? true : t.status === filter);

  const counts = {
    ALL: tasks.length,
    TODO: tasks.filter(t => t.status === "TODO").length,
    IN_PROGRESS: tasks.filter(t => t.status === "IN_PROGRESS").length,
    DONE: tasks.filter(t => t.status === "DONE").length,
  };

  return (
    <>
    
      <div className="db-root">

        {/* NAVBAR */}
        <nav className="db-nav">
          <div className="nav-brand">
            <div className="nav-brand-dot" />
            <span className="nav-brand-name">Kriya</span>
          </div>
          <div className="nav-right">
            <span className="nav-task-count">{tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>
            <button className="btn-logout" onClick={logout}>Sign Out</button>
          </div>
        </nav>

        <div className="db-body">

          {/* HEADER */}
          <div className="db-header">
            <h1 className="db-title">Your <span>workspace</span></h1>
            <p className="db-date">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* ADD TASK */}
          <div className="add-section">
            <p className="add-section-label">New Task</p>
            <div className="add-grid">
              <input
                type="text"
                placeholder="Task title"
                value={taskData.title}
                className="add-input"
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={taskData.description}
                className="add-input"
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              />
              <select
                value={taskData.status}
                className="add-select"
                onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
              <button className="btn-add" onClick={handleAddTask}>Add Task</button>
            </div>
          </div>

          {/* FILTERS */}
          <div className="filter-bar">
            {["ALL", "TODO", "IN_PROGRESS", "DONE"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-btn ${filter === f ? "active" : "inactive"}`}
              >
                {f === "ALL" ? "All" : STATUS_CONFIG[f]?.label || f}
                <span className="filter-count">{counts[f]}</span>
              </button>
            ))}
          </div>

          {/* TASK GRID */}
          {loading ? (
            <div className="spinner-wrap">
              <div className="spinner" />
            </div>
          ) : (
            <div className="task-grid">
              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✓</div>
                  <h2 className="empty-title">
                    {filter === "ALL" ? "No tasks yet" : `No ${STATUS_CONFIG[filter]?.label} tasks`}
                  </h2>
                  <p className="empty-sub">
                    {filter === "ALL" ? "Add your first task above to get started." : "Change filter or add a new task."}
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const cfg = STATUS_CONFIG[task.status] || STATUS_CONFIG.TODO;
                  return (
                    <div
                      key={task.taskId}
                      className="task-card"
                      style={{ "--card-accent": cfg.bg }}
                    >
                      <div className="task-card-top">
                        <h3 className="task-title">{task.title}</h3>
                        <span className="task-badge" style={{ background: cfg.bg, color: cfg.color }}>
                          <span className="task-badge-dot" style={{ background: cfg.dot }} />
                          {cfg.label}
                        </span>
                      </div>
                      <p className="task-desc">{task.description || "No description"}</p>
                      <div className="task-actions">
                        <button
                          className="btn-edit"
                          onClick={() => {
                            setEditingTask(task);
                            setEditData({ title: task.title, description: task.description, status: task.status });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => confirmDelete(task.taskId)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* EDIT MODAL */}
        {editingTask && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setEditingTask(null)}>
            <div className="modal-box">
              <h2 className="modal-title">Edit Task</h2>
              <p className="modal-sub">Update the details for this task</p>

              <div className="modal-field">
                <label className="modal-label">Title</label>
                <input
                  type="text"
                  value={editData.title}
                  className="modal-input"
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
              </div>

              <div className="modal-field">
                <label className="modal-label">Description</label>
                <input
                  type="text"
                  value={editData.description}
                  className="modal-input"
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                />
              </div>

              <div className="modal-field">
                <label className="modal-label">Status</label>
                <select
                  value={editData.status}
                  className="modal-select"
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </div>

              <div className="modal-actions">
                <button className="btn-save" onClick={updateTask}>Save Changes</button>
                <button className="btn-cancel" onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;