import axios from "axios";
import { useState } from "react";
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

   const handleSubmit = async(e)=>{
        e.preventDefault()
         try{
          const res =  await axios.post("http://localhost:5000/api/auth/login",{
              email,
              password
            });

            localStorage.setItem('token',res.data.data);

            console.log(res.data.errors.msg);

            alert(res.data.message);
             setEmail("");
             setPassword('');

         }catch(err){
             console.log("errrrr",err)
             const errorResponse = err.response?.data 
             console.log("errorResponse",errorResponse);
             if(errorResponse?.errors){
                 const newErrors ={};
         
                 errorResponse.errors.forEach((err) => {
                 newErrors[err.path] = err.msg;
                 });
                 setErrors(newErrors);
             }else {
        setMessage("Something went wrong");
      }
         }
        
   }


  return (
    <div className="main-container">
      <h1 className="login-text">Login</h1>
      {message && <p className="alert-message">{message}</p>}

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

          <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
