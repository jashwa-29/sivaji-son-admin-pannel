import { useState } from "react";
import { FaEdit, FaTrash, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for actions and close

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    { id: 1, username: "john_doe", password: "pass123", empId: "E101", phone: "9876543210" },
    { id: 2, username: "jane_smith", password: "pass456", empId: "E102", phone: "8765432109" },
    { id: 3, username: "john_doe", password: "pass123", empId: "E101", phone: "9876543210" },
    { id: 4, username: "jane_smith", password: "pass456", empId: "E102", phone: "8765432109" },
    { id: 5, username: "john_doe", password: "pass123", empId: "E101", phone: "9876543210" },
    { id: 6, username: "jane_smith", password: "pass456", empId: "E102", phone: "8765432109" },
    { id: 7, username: "john_doe", password: "pass123", empId: "E101", phone: "9876543210" },
    { id: 8, username: "jane_smith", password: "pass456", empId: "E102", phone: "8765432109" },
  ]);
  const [modal, setModal] = useState({ type: "", isOpen: false, staff: null });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    empId: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const openModal = (type, staff = null) => {
    if (type === "edit" && staff) {
      setFormData({
        username: staff.username,
        password: staff.password,
        empId: staff.empId,
        phone: staff.phone,
      });
    } else {
      setFormData({
        username: "",
        password: "",
        empId: "",
        phone: "",
      });
    }
    setModal({ type, isOpen: true, staff });
  };

  const closeModal = () => {
    setModal({ type: "", isOpen: false, staff: null });
    setFormData({
      username: "",
      password: "",
      empId: "",
      phone: "",
    });
    setShowPassword(false); // Reset password visibility on modal close
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modal.type === "add") {
      // Add new staff
      const newStaff = {
        id: Date.now(), // Generate a unique ID
        ...formData,
      };
      setStaff([...staff, newStaff]);
    } else if (modal.type === "edit") {
      // Update existing staff
      const updatedStaff = staff.map((s) =>
        s.id === modal.staff.id ? { ...s, ...formData } : s
      );
      setStaff(updatedStaff);
    }

    closeModal();
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 p-6 rounded-lg shadow-lg">
        {/* Header and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <button
            onClick={() => openModal("add")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add New Staff
          </button>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full">
            <thead className="dark:bg-gray-800 bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">S.No</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Username</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Password</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Employee ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s, index) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{s.username}</td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">••••••••</td> {/* Masked password */}
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{s.empId}</td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{s.phone}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal("edit", s)}
                        className="dark:text-green-400 dark:hover:text-green-300 text-green-600 hover:text-green-800 transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openModal("delete", s)}
                        className="dark:text-red-400 dark:hover:text-red-300 text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modal.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="dark:bg-gray-800 dark:text-white bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold capitalize">{modal.type} Staff</h2>
                  <button
                    onClick={closeModal}
                    className="dark:text-gray-300 dark:hover:text-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
                {modal.type === "delete" ? (
                  <>
                    <p className="mb-4">Are you sure you want to delete this staff member?</p>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={closeModal}
                        className="dark:bg-gray-600 dark:hover:bg-gray-700 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setStaff(staff.filter((s) => s.id !== modal.staff.id));
                          closeModal();
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Username"
                      className="w-full p-3 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="w-full p-3 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                      </button>
                    </div>
                    <input
                      type="text"
                      name="empId"
                      value={formData.empId}
                      onChange={handleInputChange}
                      placeholder="Employee ID"
                      className="w-full p-3 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full p-3 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;