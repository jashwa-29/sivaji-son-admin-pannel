import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [role, setRole] = useState("staff"); // Default role

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (credentials.username && credentials.password) {
      // Store user role in localStorage
      localStorage.setItem("userRole", role);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin/managestaff"); // Redirect to admin dashboard
      } else {
        navigate("/"); // Redirect to staff attendance page
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="dark:bg-gray-800 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium mb-2 dark:text-gray-300">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full p-3 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full p-3 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full p-3 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;