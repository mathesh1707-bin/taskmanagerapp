import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });

  const handleRegister = async () => {
    try {
      await API.post("/users/register", data);
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      console.log(err.response);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-root {
          min-height: 100vh;
          background-color: #f5f0e8;
          background-image:
            radial-gradient(ellipse at 80% 50%, rgba(75, 139, 108, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 10% 20%, rgba(167, 197, 189, 0.12) 0%, transparent 50%);
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
        }

        .reg-left {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 52px;
        }

        .reg-card {
          width: 100%;
          max-width: 400px;
        }

        .reg-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4B8B6C;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .reg-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1.5px;
          background: #4B8B6C;
        }

        .reg-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 600;
          color: #1B4332;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .reg-subtitle {
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

        .field-input::placeholder { color: #b5aea6; }

        .btn-register {
          width: 100%;
          padding: 15px;
          border-radius: 10px;
          border: none;
          background: #4B8B6C;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .btn-register:hover {
          background: #1B4332;
          box-shadow: 0 8px 24px rgba(27, 67, 50, 0.25);
          transform: translateY(-1px);
        }

        .reg-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 13px;
          color: #9a9288;
        }

        .reg-footer a {
          color: #4B8B6C;
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }

        .reg-footer a:hover { border-bottom-color: #4B8B6C; }

        .reg-right {
          background-color: #1B4332;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 52px;
          position: relative;
          overflow: hidden;
        }

        .reg-right::before {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .steps-heading {
          font-family: 'Cormorant Garamond', serif;
          color: #DCF3DC;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 36px;
          opacity: 0.7;
        }

        .step-item {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .step-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(167, 197, 189, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          color: #A7C5BD;
          flex-shrink: 0;
        }

        .step-text-title {
          font-family: 'DM Sans', sans-serif;
          color: #f5f0e8;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .step-text-desc {
          color: rgba(220, 243, 220, 0.5);
          font-size: 12px;
          font-weight: 300;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .reg-root { grid-template-columns: 1fr; }
          .reg-right { display: none; }
          .reg-left { padding: 40px 24px; }
        }
      `}</style>

      <div className="reg-root">
        <div className="reg-left">
          <div className="reg-card">
            <p className="reg-eyebrow">New Account</p>
            <h2 className="reg-title">Create your workspace</h2>
            <p className="reg-subtitle">Start organizing your tasks in seconds</p>

            <div className="field-wrap">
              <label className="field-label">Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                className="field-input"
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>

            <div className="field-wrap">
              <label className="field-label">Password</label>
              <input
                type="password"
                placeholder="Choose a strong password"
                className="field-input"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <button className="btn-register" onClick={handleRegister}>
              Create Account →
            </button>

            <p className="reg-footer">
              Already have an account?{" "}
              <Link to="/">Sign in</Link>
            </p>
          </div>
        </div>

        <div className="reg-right">
          <p className="steps-heading">How it works</p>

          {[
            { n: "01", title: "Create an account", desc: "Set up your personal workspace in under a minute." },
            { n: "02", title: "Add your tasks", desc: "Capture anything — big projects or small to-dos." },
            { n: "03", title: "Track & complete", desc: "Move tasks through TODO → IN PROGRESS → DONE." },
          ].map((s) => (
            <div className="step-item" key={s.n}>
              <div className="step-num">{s.n}</div>
              <div>
                <p className="step-text-title">{s.title}</p>
                <p className="step-text-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Register;