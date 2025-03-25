import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MonthlyAttendancePage = () => {
  const navigate = useNavigate();

  const [attendanceData] = useState(
    Array.from({ length: 90 }, (_, i) => ({
      id: i + 1,
      date: `${String((i % 30) + 1).padStart(2, "0")}-${String(Math.floor(i / 30) + 1).padStart(2, "0")}-2025`,
      status: i % (3 + (i % 5 === 0 ? 1 : 0)) === 0 ? "Absent" : "Present",
    }))
  );

  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState("2025");

  const handleBack = () => navigate("/admin/staffattendance");

  const filteredData = attendanceData.filter((item) => {
    const [day, month, year] = item.date.split("-");
    return month === selectedMonth && year === selectedYear;
  });

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-4xl dark:bg-gray-900 dark:text-white bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold">Monthly Attendance</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md  mb-4">
          <div className="flex flex-col">
            <label className="text-gray-600 dark:text-gray-300 mb-1">Year:</label>
            <input
              type="number"
              min="2000"
              max="2100"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 dark:text-gray-300 mb-1">Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
            >
              {[...Array(12).keys()].map((m) => (
                <option key={m + 1} value={String(m + 1).padStart(2, "0")}>
                  {new Date(2025, m).toLocaleString("en-US", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center mb-5">
          <div className="flex justify-around">
            <div className="text-sm font-medium">Total Days: {filteredData.length}</div>
            <div className="text-sm font-medium text-green-600 dark:text-green-400">
              Present: {filteredData.filter((item) => item.status === "Present").length}
            </div>
            <div className="text-sm font-medium text-red-600 dark:text-red-400">
              Absent: {filteredData.filter((item) => item.status === "Absent").length}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 dark:border-gray-700 text-center">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="p-3">S.no</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "Present"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
  );
};

export default MonthlyAttendancePage;