import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.1.38:8080/login", credentials);
      
      if (response.data && response.data.role) {
        // Store user role and any other relevant data in localStorage
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("token", response.data.token); // if using JWT
        localStorage.setItem("userData", JSON.stringify(response.data.user)); // if there's additional user data

        // Redirect based on role
        if (response.data.role === "admin") {
          navigate("/admin/managestaff");
        } else {
          navigate("/staff");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="dark:bg-gray-800 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">Login</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
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