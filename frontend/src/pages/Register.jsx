import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/register.css"; 

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