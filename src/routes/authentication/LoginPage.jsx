import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define API base URL (replace with your actual backend URL)
const API_BASE_URL = "http://192.168.1.38:8080";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
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
    setError("");
    
    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting to login...");
      
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username: credentials.username,
        password: credentials.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Login response:", response);

      if (!response.data) {
        throw new Error("No data received from server");
      }

      localStorage.setItem('userRole', response.data.role);

      const userRole = localStorage.getItem('userRole'); // Retrieve from localStorage
      
      if (userRole === 'admin') {
        navigate('/admin');
      }
      else if(userRole === 'staff'){
        navigate('/staff');
      }
      else{
        localStorage.setItem('userRole');
      }



    } catch (err) {
      console.error("Login error:", err);
      
      let errorMessage = "Login failed. Please check your credentials and try again.";
      
      if (err.code === "ERR_NETWORK") {
        errorMessage = "Cannot connect to server. Please check your network connection.";
      } else if (err.response?.status === 401) {
        errorMessage = "Invalid username or password.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
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
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;