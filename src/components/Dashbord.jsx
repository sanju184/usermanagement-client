import "../css/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Welcome back, John Doe!</h1>
      <p className="dashboard-subtitle">Here's what's happening with your user management system today.</p>

      <div className="dashboard-cards">
        <div className="card">
          <div className="icon-box blue">
            <i class="fa-solid fa-users"></i>
          </div>
          <div className="card-content">
            <h3>Total Users</h3>
            <p className="value">3 <span className="growth">+12%</span></p>
          </div>
        </div>

        <div className="card">
          <div className="icon-box purple">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <div className="card-content">
            <h3>Employees</h3>
            <p className="value">1 <span className="growth">+5%</span></p>
          </div>
        </div>



        <div className="card">
          <div className="icon-box green">
            <i class="fa-solid fa-user-tie"></i>
          </div>
          <div className="card-content">
            <h3>Intern</h3>
            <p className="value">2 <span className="growth">+18%</span></p>
          </div>
        </div>

        <div className="card">
          <div className="icon-box orange">
           <i class="fa-solid fa-money-check-dollar"></i>
          </div>
          <div className="card-content">
            <h3>Total Salary</h3>
            <p className="value">0 <span className="growth">+23%</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
