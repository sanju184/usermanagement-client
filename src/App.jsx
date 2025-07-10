import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashbord from './components/Dashbord.jsx';
import Navbar from './components/Navbar.jsx';
import User from './components/User.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
const App = () => {
  return (
    <>

    <Navbar></Navbar>
     
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<User />} />
        <Route path="/dashboard" element={<Dashbord />} />
      </Routes>
    </>
  );
};

export default App;