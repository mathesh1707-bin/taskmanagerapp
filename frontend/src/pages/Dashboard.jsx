import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        status: "TODO",
    });

    const [editingTask, setEditingTask] = useState(null);

    const [editData, setEditData] = useState({
        title: "",
        description: "",
        status: "TODO",
    });

    const [filter, setFilter] = useState("ALL");

    // FETCH TASKS

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

    useEffect(() => {
        fetchTasks();
    }, []);

    // ADD TASK

    const handleAddTask = async () => {

        try {

            await API.post("/tasks", taskData);

            toast.success("Task added");

            setTaskData({
                title: "",
                description: "",
                status: "TODO",
            });

            fetchTasks();

        } catch (err) {

            console.log(err);

            toast.error("Failed to add task");
        }
    };

    // DELETE TASK

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

    // UPDATE TASK

    const updateTask = async () => {

        try {

            await API.put(
                `/tasks/${editingTask.taskId}`,
                editData
            );

            toast.success("Task updated");

            setEditingTask(null);

            fetchTasks();

        } catch (err) {

            console.log(err);

            toast.error("Update failed");
        }
    };

    // LOGOUT

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <div className="min-h-screen bg-black text-white p-6">

            {/* NAVBAR */}

            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-4xl font-bold">
                        Task Dashboard
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Manage your daily workflow
                    </p>

                </div>

                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl transition-all"
                >
                    Logout
                </button>

            </div>

            {/* ADD TASK */}

            <div className="bg-white/10 border border-white/10 rounded-2xl p-6 mb-10 backdrop-blur-lg">

                <h2 className="text-2xl font-semibold mb-6">
                    Add New Task
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        placeholder="Task Title"
                        value={taskData.title}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                title: e.target.value,
                            })
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddTask();
                            }
                        }}
                        className="p-4 rounded-xl bg-black/30 border border-gray-700 outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={taskData.description}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                description: e.target.value,
                            })
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddTask();
                            }
                        }}
                        className="p-4 rounded-xl bg-black/30 border border-gray-700 outline-none"
                    />

                    <select
                        value={taskData.status}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                status: e.target.value,
                            })
                        }
                        className="p-4 rounded-xl bg-black/30 border border-gray-700 outline-none"
                    >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>

                </div>

                <button
                    onClick={handleAddTask}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                    Add Task
                </button>

            </div>

            {/* FILTERS */}

            <div className="flex gap-3 mb-8 flex-wrap">

                {["ALL", "TODO", "IN_PROGRESS", "DONE"].map((item) => (

                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`px-5 py-2 rounded-xl transition-all
                        ${
                            filter === item
                                ? "bg-blue-600"
                                : "bg-gray-800 hover:bg-gray-700"
                        }`}
                    >
                        {item}
                    </button>

                ))}

            </div>

            {/* TASK GRID */}

            {loading ? (

                <div className="flex justify-center py-24">

                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                </div>

            ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {tasks.length === 0 ? (

                        <div className="col-span-full text-center py-20">

                            <h2 className="text-3xl font-bold text-gray-500">
                                No Tasks Yet
                            </h2>

                            <p className="text-gray-600 mt-3">
                                Create your first task to get started
                            </p>

                        </div>

                    ) : (

                        tasks
                            .filter((task) =>
                                filter === "ALL"
                                    ? true
                                    : task.status === filter
                            )
                            .map((task) => (

                                <div
                                    key={task.taskId}
                                    className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:scale-[1.02] hover:-translate-y-1 duration-300 transition-all"
                                >

                                    <div className="flex justify-between items-start mb-4">

                                        <h2 className="text-2xl font-semibold">
                                            {task.title}
                                        </h2>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${
                                                task.status === "DONE"
                                                    ? "bg-green-600"
                                                    : task.status === "IN_PROGRESS"
                                                    ? "bg-yellow-500 text-black"
                                                    : "bg-gray-700"
                                            }`}
                                        >
                                            {task.status}
                                        </span>

                                    </div>

                                    <p className="text-gray-300 mb-6">
                                        {task.description}
                                    </p>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => {

                                                setEditingTask(task);

                                                setEditData({
                                                    title: task.title,
                                                    description: task.description,
                                                    status: task.status,
                                                });
                                            }}
                                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => {

                                                const confirmed = window.confirm(
                                                    "Delete this task?"
                                                );

                                                if (confirmed) {
                                                    deleteTask(task.taskId);
                                                }
                                            }}
                                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-all"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))

                    )}

                </div>

            )}

            {/* EDIT MODAL */}

            {editingTask && (

                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-lg">

                        <h2 className="text-3xl font-bold mb-6">
                            Edit Task
                        </h2>

                        <div className="space-y-4">

                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 outline-none"
                            />

                            <input
                                type="text"
                                value={editData.description}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 outline-none"
                            />

                            <select
                                value={editData.status}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        status: e.target.value,
                                    })
                                }
                                className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 outline-none"
                            >
                                <option value="TODO">TODO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>

                        </div>

                        <div className="flex gap-4 mt-6">

                            <button
                                onClick={updateTask}
                                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
                            >
                                Save Changes
                            </button>

                            <button
                                onClick={() => setEditingTask(null)}
                                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Dashboard;