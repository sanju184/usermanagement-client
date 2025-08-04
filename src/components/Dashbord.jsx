import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import { getUser } from "../services/Api";

const Dashboard = () => {
  const navigation = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUser();
        setUsers(res.data ? res.data : []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  console.log(users);

  // Calculate totals
  const totalUsers = Array.isArray(users) ? users.length : 0;
  console.log("total users ", totalUsers);
  const employees = Array.isArray(users)
    ? users.filter((u) => u.position === "Employee")
    : [];
  const totalEmployees = employees.length;

  console.log("Employyes:", totalEmployees);

  const interns = Array.isArray(users)
    ? users.filter((u) => u.position === "Intern")
    : [];
  const totalInterns = interns.length;

  const salary = Array.isArray(users)
    ? users.reduce((sum, value) => sum + value.salary, 0)
    : [];

  const recentUsers = Array.isArray(users) ? users.reverse().slice(0, 5) : [];

  console.log("recentUsers", recentUsers);

  return (
    // FIRST CARD.........................

    <div className="dashboard-page">
      <div className="upper-section">
        <h1 className="dashboard-title">Welcome back, John Doe!</h1>
        <p className="dashboard-subtitle">
          Here's what's happening with your user management system today.
        </p>

        <div className="dashboard-cards">
          <div className="card">
            <div className="icon-box blue">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="card-content">
              <h3>Total Users</h3>
              <p className="value">
                {totalUsers}
                <span className="growth">+12%</span>
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon-box purple">
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <div className="card-content">
              <h3>Employees</h3>
              <p className="value">
                {totalEmployees} <span className="growth">+5%</span>
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon-box green">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <div className="card-content">
              <h3>Intern</h3>
              <p className="value">
                {totalInterns}
                <span className="growth">+18%</span>
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon-box orange">
              <i class="fa-solid fa-money-check-dollar"></i>
            </div>
            <div className="card-content">
              <h3>Total Salary</h3>
              <p className="value">
                {salary} <span className="growth">+23%</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="card1">
          <div className="recent-user">Recent User</div>

          {Array.isArray(recentUsers) &&
            recentUsers.length > 0 &&
            recentUsers.map((user, index) => (
              <div key={index} className="card-item">
                <div className="card-item-detail">
                  <div className="icon-box-user">
                    <img
                      className="table-avatar"
                      src={
                        user.photo
                          ? `http://localhost:5000/uploads/${user.photo}`
                          : "https://via.placeholder.com/40"
                      }
                      alt={user.name  }
                    />
                  </div>
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                  </div>
                </div>
                <p className="role-badge">{user.position}</p>
              </div>
            ))}

          <button className="view-all-btn" onClick={() => navigation("/users")}>
            View All Users
          </button>
        </div>

        <div className="card1">
          <div className="recent-user">Quick Actions</div>

          <div
            className="card-item newuser"
            onClick={() => navigation("/users")}
          >
            <div className="card-item-detail">
              <div className="icon-add">
                <i class="fa-solid fa-user-plus"></i>
              </div>
              <div className="user-info">
                <h3>Addd New User</h3>
                <p>Create a new user account</p>
              </div>
            </div>
          </div>

          <div
            className="card-item manageuser"
            onClick={() => navigation("/users")}
          >
            <div className="card-item-detail">
              <div className="icon-manage">
                <i class="fa-solid fa-users"></i>
              </div>
              <div className="user-info">
                <h3>Manage User</h3>
                <p>View , edit and delete user</p>
              </div>
            </div>
          </div>

          <div className="card-item edituser">
            <div className="card-item-detail">
              <div className="icon-edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </div>
              <div className="user-info">
                <h3>Edit profile</h3>
                <p>Update your user account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
