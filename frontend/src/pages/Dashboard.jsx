import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .db-root {
          min-height: 100vh;
          background-color: #f0ebe0;
          font-family: 'DM Sans', sans-serif;
          color: #1B4332;
        }

        /* ─── NAVBAR ─── */
        .db-nav {
          background: #fefefe;
          border-bottom: 1px solid #e0d9cf;
          padding: 0 40px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-brand-dot {
          width: 9px;
          height: 9px;
          background: #4B8B6C;
          border-radius: 50%;
        }

        .nav-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #1B4332;
          letter-spacing: 0.02em;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-task-count {
          font-size: 12px;
          color: #7a8c85;
          font-weight: 300;
        }

        .btn-logout {
          padding: 8px 20px;
          border-radius: 8px;
          border: 1.5px solid #1B4332;
          background: transparent;
          color: #1B4332;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }

        .btn-logout:hover {
          background: #1B4332;
          color: #DCF3DC;
        }

        /* ─── MAIN LAYOUT ─── */
        .db-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 40px 80px;
        }

        .db-header {
          margin-bottom: 40px;
        }

        .db-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 300;
          color: #1B4332;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .db-title span {
          font-style: italic;
          color: #4B8B6C;
        }

        .db-date {
          font-size: 13px;
          color: #9a9288;
          font-weight: 300;
          margin-top: 6px;
        }

        /* ─── ADD TASK ─── */
        .add-section {
          background: #fefefe;
          border: 1px solid #e0d9cf;
          border-radius: 16px;
          padding: 28px 32px;
          margin-bottom: 36px;
        }

        .add-section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4B8B6C;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .add-section-label::before {
          content: '';
          display: inline-block;
          width: 16px;
          height: 1.5px;
          background: #4B8B6C;
        }

        .add-grid {
          display: grid;
          grid-template-columns: 1fr 1fr auto auto;
          gap: 12px;
          align-items: center;
        }

        .add-input {
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e0d9cf;
          background: #f8f4ec;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1B4332;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .add-input:focus {
          border-color: #4B8B6C;
          background: #fefefe;
          box-shadow: 0 0 0 3px rgba(75, 139, 108, 0.08);
        }

        .add-input::placeholder { color: #b5aea6; }

        .add-select {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1.5px solid #e0d9cf;
          background: #f8f4ec;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1B4332;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234B8B6C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }

        .add-select:focus { border-color: #4B8B6C; }

        .btn-add {
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          background: #1B4332;
          color: #DCF3DC;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .btn-add:hover {
          background: #4B8B6C;
          box-shadow: 0 6px 20px rgba(27, 67, 50, 0.2);
          transform: translateY(-1px);
        }

        /* ─── FILTERS ─── */
        .filter-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 18px;
          border-radius: 100px;
          border: 1.5px solid transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .filter-btn.inactive {
          background: #fefefe;
          border-color: #e0d9cf;
          color: #6b7c75;
        }

        .filter-btn.inactive:hover {
          border-color: #4B8B6C;
          color: #1B4332;
        }

        .filter-btn.active {
          background: #1B4332;
          color: #DCF3DC;
          border-color: #1B4332;
        }

        .filter-count {
          font-size: 11px;
          opacity: 0.7;
          font-weight: 500;
        }

        /* ─── TASK GRID ─── */
        .task-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .task-card {
          background: #fefefe;
          border: 1px solid #e0d9cf;
          border-radius: 14px;
          padding: 24px;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          position: relative;
          overflow: hidden;
        }

        .task-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--card-accent, #DCF3DC);
          border-radius: 14px 14px 0 0;
        }

        .task-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(27, 67, 50, 0.1);
          border-color: #c8c0b4;
        }

        .task-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .task-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #1B4332;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .task-badge {
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
        }

        .task-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .task-desc {
          color: #7a8c85;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 20px;
          min-height: 40px;
        }

        .task-actions {
          display: flex;
          gap: 8px;
          border-top: 1px solid #f0ebe0;
          padding-top: 16px;
        }

        .btn-edit {
          padding: 8px 18px;
          border-radius: 8px;
          border: none;
          background: #4B8B6C;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .btn-edit:hover {
          background: #1B4332;
          transform: translateY(-1px);
        }

        .btn-delete {
          padding: 8px 18px;
          border-radius: 8px;
          border: 1.5px solid #e0d9cf;
          background: transparent;
          color: #9a9288;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-delete:hover {
          border-color: #d94040;
          color: #d94040;
          background: #fff5f5;
        }

        /* ─── EMPTY STATE ─── */
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 20px;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          background: #DCF3DC;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 26px;
        }

        .empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: #1B4332;
          margin-bottom: 8px;
        }

        .empty-sub {
          color: #9a9288;
          font-size: 14px;
          font-weight: 300;
        }

        /* ─── SPINNER ─── */
        .spinner-wrap {
          display: flex;
          justify-content: center;
          padding: 80px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #DCF3DC;
          border-top-color: #4B8B6C;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ─── MODAL ─── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(27, 67, 50, 0.3);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 20px;
        }

        .modal-box {
          background: #fefefe;
          border: 1px solid #e0d9cf;
          border-radius: 20px;
          padding: 36px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 24px 60px rgba(27, 67, 50, 0.15);
        }

        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: #1B4332;
          margin-bottom: 6px;
        }

        .modal-sub {
          font-size: 13px;
          color: #9a9288;
          margin-bottom: 28px;
          font-weight: 300;
        }

        .modal-field {
          margin-bottom: 16px;
        }

        .modal-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4B8B6C;
          margin-bottom: 8px;
        }

        .modal-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e0d9cf;
          background: #f8f4ec;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1B4332;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .modal-input:focus {
          border-color: #4B8B6C;
          background: #fefefe;
          box-shadow: 0 0 0 3px rgba(75, 139, 108, 0.08);
        }

        .modal-select {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1.5px solid #e0d9cf;
          background: #f8f4ec;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1B4332;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234B8B6C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          transition: border-color 0.2s;
        }

        .modal-select:focus { border-color: #4B8B6C; }

        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }

        .btn-save {
          flex: 1;
          padding: 13px;
          border-radius: 10px;
          border: none;
          background: #1B4332;
          color: #DCF3DC;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .btn-save:hover {
          background: #4B8B6C;
          transform: translateY(-1px);
        }

        .btn-cancel {
          padding: 13px 20px;
          border-radius: 10px;
          border: 1.5px solid #e0d9cf;
          background: transparent;
          color: #6b7c75;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          border-color: #c8c0b4;
          color: #1B4332;
        }

        @media (max-width: 768px) {
          .db-nav { padding: 0 20px; }
          .db-body { padding: 28px 20px 60px; }
          .add-grid { grid-template-columns: 1fr; }
          .db-title { font-size: 32px; }
        }
      `}</style>

      <div className="db-root">

        {/* NAVBAR */}
        <nav className="db-nav">
          <div className="nav-brand">
            <div className="nav-brand-dot" />
            <span className="nav-brand-name">KRIYA</span>
          </div>
          <div className="nav-right">
            <span className="nav-task-count">{tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>
            <button className="btn-logout" onClick={logout}>Sign Out</button>
          </div>
        </nav>

        <div className="db-body">

          {/* HEADER */}
          <div className="db-header">
            <h1 className="db-title">
              Your <span>workspace</span>
            </h1>
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
                        <span
                          className="task-badge"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
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
                          onClick={() => {
                            if (window.confirm("Delete this task?")) deleteTask(task.taskId);
                          }}
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