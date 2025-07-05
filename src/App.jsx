
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

const App = ()=> {
  return (
  <Router>
      <Routes>
        <Route path="/nfjkfjnv" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
 
  )
}

export default App
