import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleRegister = async () => {

    try {

      await API.post("/users/register", data);

      alert("Registration successful");

      navigate("/");

    } catch (err) {

      console.log(err.response);

      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Start managing your tasks
        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 text-white outline-none focus:border-green-500"
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 text-white outline-none focus:border-green-500"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-semibold py-4 rounded-xl"
          >
            Register
          </button>

        </div>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-400 hover:text-green-300"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;