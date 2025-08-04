import { useState } from "react";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="brand">
          <span className="logo-icon">
            <FaUser style={{ color: "#ffffff" }} />
          </span>
          <span className="brand-name">UserManager</span>
        </div>
      </div>

      <div className="navbar-right">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Users
        </NavLink>

        <div className="profile-section" onClick={toggleDropdown}>
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.uRYpeyDdgui_P7w_qY2FlgHaIR?rs=1&pid=ImgDetMain&o=7&rm=3  "
            alt="Profile"
            className="profile-img"
          />
          <span className="profile-name">John Doe</span>
        </div>
        {dropdownOpen && (
          <div className="profile-dropdown">
            <NavLink to="/edit-profile" className="dropdown-item">
              <FaCog className="dropdown-icon" /> Edit Profile
            </NavLink>
            <div className="dropdown-item logout" onClick={handleLogout}>
              <FaSignOutAlt className="dropdown-icon" /> Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
