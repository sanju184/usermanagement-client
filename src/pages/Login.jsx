import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/login.css";
import { login } from "../services/Api";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setTimeout(() => setMessage(""), 2000);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.data.data);

      console.log(res.data.errors.msg);

      alert(res.data.message);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log("errrrr", err);
      const errorResponse = err.response?.data;
      console.log("errorResponse", errorResponse);
      if (errorResponse?.errors) {
        const newErrors = {};

        errorResponse.errors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });
        setErrors(newErrors);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="main-container">
      <h1 className="login-text">Login</h1>

      {message && (
        <div
          className={`popup-message ${
            message.toLowerCase().includes("success") ? "success" : "error"
          }`}
        >
          {message}
        </div>
      )}

      <form className="form-login" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          className="input-field"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit" className="login-btn">
          Login
        </button>
        <p className="bottom-text">
          Don't Have An Acoount ? <Link to="/register">Sing Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
