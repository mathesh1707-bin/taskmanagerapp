import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Unauthorized or error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {tasks.map((task) => (
        <div key={task.taskId}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <small>{task.status}</small>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;