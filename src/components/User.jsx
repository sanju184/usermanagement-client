import { useCallback, useEffect, useRef, useState } from "react";
import { FiEdit, FiFilter, FiSearch, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import "../css/user.css";
import { addUser, deleteUser, getUser, updateUser } from "../services/Api";
const User = () => {
  const [showPopup, setShowpopup] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("Select Position");
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("salary", salary);
    formData.append("position", position);
    if (fileInputRef.current.files[0]) {
      formData.append("photo", fileInputRef.current.files[0]);
    }


    // Only append photo if a new file is selected

    //  ADD USER  AND EDIT USER BOTH.............................
    try {
      if (isEditing && editUserId) {
        const res = await updateUser(editUserId, formData);
        console.log("response", res);
        toast.success(res.data.message);
      } else {
        const res = await addUser(formData);
        toast.success(res.data.message);
      }
      setShowpopup(false);
      setName("");
      setEmail("");
      setPosition("");
      setSalary("");
      setErrors("");
      setEditUserId(null);
      setIsEditing(false);
      setPreviewImage(null);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // clear file input
      }
      // Always refresh users after update/add
      await fetchUsers();
    } catch (err) {
      const errorResponse = err.response?.data;
      if (errorResponse?.data) {
        const newError = {};
        errorResponse.data.forEach((err) => {
          newError[err.path] = err.msg;
        });
        setErrors(newError);
      } else if (errorResponse?.error) {
        toast.error(errorResponse.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleAddUser = () => {
    setShowpopup(true);
    setIsEditing(false);
    setEditUserId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedFile(file);
    } else {
      setPreviewImage(null);
      setSelectedFile(null);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  //  Fetch USER ......................

  const fetchUsers = useCallback(async () => {
    try {
      const res = await getUser();
      setUsers(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // FILTER BY SEARCH...................

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleDropdown = (e) => {
    setDropdown(e.target.value);
  };

  const filterUser = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesDropdown =
      dropdown === "All Roles" || dropdown === "" || user.position === dropdown;

    return matchesSearch && matchesDropdown;
  });

  // EDIT BUTTON.....................

  const handleEditButton = (user) => {
    setShowpopup(true);
    setIsEditing(true);
    setEditUserId(user._id);
    setName(user.name);
    setEmail(user.email);
    setSalary(user.salary);
    setPosition(user.position);
    setPreviewImage(user.photo ? `http://localhost:5000/uploads/${user.photo}` : null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlDeletButton =async(user)=>{

    const confirmDelete = window.confirm(`Are you sure you want to delete ${user.name}?`);
    if (!confirmDelete) return;

    try {
      const res = await deleteUser(user._id);
      toast.success(res.data.message);
      await fetchUsers();
    } catch (err) {
      console.error(err);
    }
  }

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

      {/* POP UP BOX  FOR ADD USER AND EDIT USER */}

      {showPopup && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowpopup(false);
            setPreviewImage(null);
            setErrors("");
          }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New User</h2>
            <form className="modal-form" onSubmit={handleSubmit}>
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
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </label>
              {errors.name && <p className="error-text">{errors.name}</p>}
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </label>
              {errors.email && <p className="error-text">{errors.email}</p>}
              <label>
                Salary
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Enter Salary"
                />
              </label>
              {errors.salary && <p className="error-text">{errors.salary}</p>}
              <label>
                Position
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  {" "}
                  <option value="">Select Position</option>
                  <option value="Employee">Employee</option>
                  <option value="Hr">Hr</option>
                  <option value="Intern">Intern</option>
                </select>
              </label>
              {errors.position && (
                <p className="error-text">{errors.position}</p>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowpopup(false);
                    setPreviewImage(null);
                    setErrors("");
                    setName("");
                    setEmail("");
                    setPosition("");
                    setSalary("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {isEditing ? "Edit" : "Add User"}
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
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <span>
          {" "}
          <FiFilter className="filter-icon" />
        </span>
        <select
          value={dropdown}
          onChange={handleDropdown}
          className="role-dropdown"
        >
          <option>All Roles</option>
          <option>Intern</option>
          <option>Hr</option>
          <option>Employee</option>
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
            {users && users.length > 0 ? (
              filterUser.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={
                        user.photo
                          ? `https://usermanagement-backend-1-w59j.onrender.com/uploads/${user.photo}`
                          : "https://via.placeholder.com/40"
                      }
                      alt={user.name}
                      className="table-avatar"
                     
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.salary}</td>
                  <td>{user.position}</td>
                  <td>
                    <FiEdit
                      className="table-icon edit-icon"
                      onClick={() => handleEditButton(user)}
                      title="Edit"
                    />
                    <FiTrash
                      className="table-icon delete-icon"
                      onClick={() => handlDeletButton(user)}
                      title="Delete"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
