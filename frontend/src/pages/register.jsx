import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authservice";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(form);
      alert("Registered Successfully");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h2 className="auth-title">Create Your TaskFlow Account</h2>
        <p className="auth-subtitle">Simple task tracking for your daily work.</p>

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
            placeholder="Create a password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
