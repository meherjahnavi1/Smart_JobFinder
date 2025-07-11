import React, { useState } from "react";
import "./index.css";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ isPopupOpen, closePopup, role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(
        { email, password },
        setMessage
      );
      navigate("/dashboard")
      setMessage("Login successful!");
      console.log(response);

      closePopup();
    } catch (error) {
      if (error) {
        setMessage(error.message || "Login failed. Please try again.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="cvb-login-heading">Welcome to User</h2>
      <form className="cvb-login-form" onSubmit={handleSubmit}>
        <label className="cvb-login-label">Email</label>
        <input
          type="email"
          className="cvb-login-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="cvb-login-label">Password</label>
        <input
          type="password"
          className="cvb-login-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="login-popup-login-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && (
        <p
          className={`login-message ${
            message.includes("successful") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </>
  );
};

export default LoginForm;
