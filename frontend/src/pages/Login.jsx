import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {

    try {

      const res = await API.post("/users/login", data);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {

      console.log(err.response);

      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Login to your Task Manager
        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 text-white outline-none focus:border-blue-500"
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 text-white outline-none focus:border-blue-500"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-4 rounded-xl"
          >
            Login
          </button>

        </div>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;