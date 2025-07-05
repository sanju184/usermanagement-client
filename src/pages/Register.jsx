import axios from "axios";
import { useState } from "react";
import '../css/login.css';

const Register = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleSubmit = async(e)=>{
              e.preventDefault();
              setErrors({});
             setMessage("");
          try{
             const res = await axios.post("http://localhost:5000/api/auth/register",{email,password,name});
              console.log(res);
               setMessage(res.data.message);
               setTimeout(()=>setMessage(''),4000)
               setEmail("");
               setPassword('');
               setName("");
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
             }else if(errorResponse.error) {
                setMessage(errorResponse.error); 
                setTimeout(() => setMessage(""), 4000);
      }else{
        setMessage("Something went wrong");
        setTimeout(() => setMessage(""), 4000);
      }
          }
    }
   return(
       <div className="main-container">
      <h1 className="login-text">Sign Up</h1>
      {message && (
        <div className={`popup-message ${message.toLowerCase().includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )};

      <form className="form-login" onSubmit={handleSubmit} >
          <input 
            className="input-field"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <button type="submit" className="login-btn">Register</button>
      </form>
    </div>
   )
}

export default Register;