import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/login.css";
import { login } from "../services/Api";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.data.data);

      console.log(res.data.errors);
      toast.success(res.data.message);
      setEmail("");
      setPassword("");
      navigation("/dashboard");

    } catch (err) {
      const errorResponse = err.response?.data;
      console.log("errorResponse", errorResponse);
      if (errorResponse?.errors) {
        const newErrors = {};

        errorResponse.errors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });
        setErrors(newErrors);
       
      }  else if(errorResponse?.error){
          toast.error(errorResponse.error);
        }else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="main-container">
      <h1 className="login-text">Login</h1>


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
