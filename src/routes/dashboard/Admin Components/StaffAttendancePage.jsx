import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Icons for close
import { useNavigate } from "react-router-dom"; // For navigation

const StaffattendancePage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [staff, setStaff] = useState([
    { id: 1, empId: "E101", username: "john_doe", status: "Present" },
    { id: 2, empId: "E101", username: "john_doe", status: "Present" },
    { id: 3, empId: "E101", username: "john_doe", status: "Absent" },
    { id: 4, empId: "E101", username: "john_doe", status: "Present" },
    { id: 5, empId: "E101", username: "john_doe", status: "Absent" },
    { id: 6, empId: "E101", username: "john_doe", status: "Present" },
  ]);
  const [modal, setModal] = useState({ type: "", isOpen: false, staff: null });

  const openModal = (type, staff = null) => setModal({ type, isOpen: true, staff });
  const closeModal = () => setModal({ type: "", isOpen: false, staff: null });

  const handleViewDetails = (staffId) => {
    navigate(`/admin/monthlyattendance`); // Navigate to the monthly attendance page
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Today's Attendance List</h1>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full">
            <thead className="dark:bg-gray-800 bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">S.No</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Employee ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Staff Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Monthly Attendance</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s, index) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{s.empId}</td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{s.username}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        s.status === "Present"
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                          : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewDetails(s.id)} // Navigate to monthly attendance page
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      title="View Monthly"
                    >
                      View Monthly
                    </button>
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      closeModal();
                    }}
                  >
                    <input
                      type="text"
                      defaultValue={modal.staff?.username}
                      placeholder="Username"
                      className="w-full p-3 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      defaultValue={modal.staff?.password}
                      placeholder="Password"
                      className="w-full p-3 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      defaultValue={modal.staff?.empId}
                      placeholder="Employee ID"
                      className="w-full p-3 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      defaultValue={modal.staff?.phone}
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

export default StaffattendancePage;