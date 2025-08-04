import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/login.css";
import { register } from "../services/Api";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
  

    try {
      const res = await register(email, password, name);

      setEmail("");
      setPassword("");
      setName("");
      toast.success(res.data.messages);
      navigate("/login");
    } catch (err) {
      const errorResponse = err.response?.data;

      if (errorResponse?.errors) {
        const newErrors = {};
        errorResponse.errors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });
        setErrors(newErrors);
      } else if (errorResponse?.error) {
        toast.error(errorResponse.error);
      } else {
        toast.error("Something went wrong");
        
      }
    }
  };

  return (
    <div className="main-container">
      <h1 className="login-text">Sign Up</h1>

      <form className="form-login" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

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
          Register
        </button>

        <p className="bottom-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
