import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

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
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          background-color: #f5f0e8;
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(75, 139, 108, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(167, 197, 189, 0.15) 0%, transparent 50%);
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .login-left {
          background-color: #1B4332;
          background-image:
            radial-gradient(ellipse at 30% 70%, rgba(75, 139, 108, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(167, 197, 189, 0.1) 0%, transparent 50%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 56px 52px;
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          bottom: -80px;
          right: -80px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .login-left::after {
          content: '';
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .brand-mark {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-dot {
          width: 10px;
          height: 10px;
          background: #A7C5BD;
          border-radius: 50%;
        }

        .brand-name {
          font-family: 'Cormorant Garamond', serif;
          color: #DCF3DC;
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 0.08em;
        }

        .left-heading {
          font-family: 'Cormorant Garamond', serif;
          color: #f5f0e8;
          font-size: 52px;
          font-weight: 300;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .left-heading span {
          color: #A7C5BD;
          font-style: italic;
        }

        .left-tagline {
          color: rgba(220, 243, 220, 0.6);
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.04em;
          margin-top: 16px;
          line-height: 1.6;
        }

        .login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 52px;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
        }

        .login-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 600;
          color: #1B4332;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }

        .login-subtitle {
          color: #7a8c85;
          font-size: 14px;
          font-weight: 300;
          margin-bottom: 40px;
        }

        .field-wrap {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4B8B6C;
          margin-bottom: 8px;
        }

        .field-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 10px;
          border: 1.5px solid #d6cfc4;
          background: #fefefe;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1B4332;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .field-input:focus {
          border-color: #4B8B6C;
          box-shadow: 0 0 0 3px rgba(75, 139, 108, 0.1);
        }

        .field-input::placeholder {
          color: #b5aea6;
        }

        .btn-primary {
          width: 100%;
          padding: 15px;
          border-radius: 10px;
          border: none;
          background: #1B4332;
          color: #DCF3DC;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .btn-primary:hover {
          background: #4B8B6C;
          box-shadow: 0 8px 24px rgba(27, 67, 50, 0.25);
          transform: translateY(-1px);
        }

        .login-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 13px;
          color: #9a9288;
        }

        .login-footer a {
          color: #4B8B6C;
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }

        .login-footer a:hover {
          border-bottom-color: #4B8B6C;
        }

        @media (max-width: 768px) {
          .login-root { grid-template-columns: 1fr; }
          .login-left { display: none; }
          .login-right { padding: 40px 24px; }
        }
      `}</style>

      <div className="login-root">
        <div className="login-left">
          <div className="brand-mark">
            <div className="brand-dot" />
            <span className="brand-name">TaskFlow</span>
          </div>
          <div>
            <h1 className="left-heading">
              Stay focused.<br />
              Stay <span>organized.</span>
            </h1>
            <p className="left-tagline">
              Every great outcome starts with<br />a well-managed task list.
            </p>
          </div>
          <div style={{ color: 'rgba(167,197,189,0.4)', fontSize: '11px', letterSpacing: '0.1em' }}>
            © 2025 TASKFLOW
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <h2 className="login-title">Welcome back</h2>
            <p className="login-subtitle">Sign in to continue to your workspace</p>

            <div className="field-wrap">
              <label className="field-label">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
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