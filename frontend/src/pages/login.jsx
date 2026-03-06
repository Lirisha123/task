import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authservice";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h2 className="auth-title">TaskFlow</h2>
        <p className="auth-subtitle">Welcome back. Sign in to continue.</p>

        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            className="app-input"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            className="app-input"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-switch">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
