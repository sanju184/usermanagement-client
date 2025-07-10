import { useRef, useState } from "react";
import { FiEdit, FiFilter, FiSearch, FiTrash } from "react-icons/fi";
import "../css/user.css";

const User = () => {
  const [showPopup, setShowpopup] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
   const fileInputRef = useRef(null);

  const handleAddUser = () => {
    setShowpopup(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

   const handleImageClick = () => {
    fileInputRef.current.click();
  };


  return (
    <div className="user-page">
      <div className="up-content">
        <div className="text-heading">
          <h1>User Management</h1>
          <p>Manage your system users and their permissionsAdd User</p>
        </div>

        <div className="button-content">
          <button className="add-btn" onClick={handleAddUser}>
            Add User
          </button>
        </div>
      </div>

      {/* POP UP BOX  */}

      {showPopup && (
        <div className="modal-overlay"  onClick={() => {
                    setShowpopup(false);
                    setPreviewImage(null);
                  }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New User</h2>
            <form className="modal-form">

                
              <div className="image-upload" onClick={handleImageClick}>
                {previewImage ? (
                  <img src={previewImage} alt="Preview" />
                ) : (
                  <span>Upload Image</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  hidden
                />
              </div>

              <label>
                Name
                <input type="text" placeholder="Enter name" />
              </label>
              <label>
                Email
                <input type="email" placeholder="Enter email" />
              </label>
              <label>
                Salary
                <input type="email" placeholder="Enter Salary" />
              </label>
              <label>
                Position
                <select>
                  <option>Employee</option>
                  <option>Hr</option>
                  <option>Intern</option>
                </select>
              </label>

            
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowpopup(false);
                    setPreviewImage(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* SEARCH BAR AND FILTER  */}

      <div className="filter-bar">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="search-input"
          />
        </div>

        <span>
          {" "}
          <FiFilter className="filter-icon" />
        </span>
        <select className="role-dropdown">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>User</option>
        </select>
      </div>



      {/* TABLE DATA */}


      <div className="user-table">
        <table>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>Position</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td> <img src="https://via.placeholder.com/40" alt="User" className="table-avatar" /></td>
                    <td>John Doe</td>
                    <td>john@example.com</td>
                    <td>$5000</td>
                    <td>Employee</td>
                    <td>
                      <FiEdit className="table-icon edit-icon" title="Edit" />
                      <FiTrash className="table-icon delete-icon" title="Delete" />
                    </td>
                </tr>

            </tbody>
        </table>

      </div>
    </div>
  );
};

export default User;
