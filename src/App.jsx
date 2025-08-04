import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Dashbord from './components/Dashbord.jsx';
import Navbar from './components/Navbar.jsx';
import User from './components/User.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
const App = () => {
  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    <Navbar></Navbar>
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<User />} />
        <Route path="/dashboard" element={<Dashbord />} />
      </Routes>
    </>
  );
};

export default App;