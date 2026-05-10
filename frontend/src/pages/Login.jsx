import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/login.css"; 
function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  const [focused, setFocused] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      
      <div className="login-root">
        <div className="login-left">
          <div className="brand-mark">
            <div className="brand-dot" />
            <span className="brand-name">செயல் (Seyal)</span>
          </div>
          <div>
            <h1 className="left-heading">
              Organize,<br />
              Track,<span>Complete.</span>
            </h1>
            <p className="left-tagline">
              Every great outcome starts with<br />a well-managed task list.
            </p>
          </div>
          <div style={{ color: 'rgba(167,197,189,0.4)', fontSize: '11px', letterSpacing: '0.1em' }}>
            © 2026 MATHESH
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <h2 className="login-title">Welcome back</h2>
            <p className="login-subtitle">Sign in to continue to your workspace</p>

            <div className="field-wrap">
              <label className="field-label">Username/Email</label>
              <input
                type="text"
                placeholder="Enter your username/email"
                className="field-input"
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>

            <div className="field-wrap">
              <label className="field-label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="field-input"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <button className="btn-primary" onClick={handleLogin}>
              Sign In →
            </button>

            <p className="login-footer">
              Don't have an account?{" "}
              <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;