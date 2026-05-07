import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

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
    <div>

      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setData({ ...data, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default Login;