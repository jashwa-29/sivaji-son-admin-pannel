import { useState, useEffect } from "react";

const AttendancePage = () => {
  const [fullName, setFullName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [loginDateTime, setLoginDateTime] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      setLoginDateTime(new Date().toISOString().slice(0, 16));
    };

    updateDateTime(); // Set initial time
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    let validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = "Full Name is required.";
    }

    if (!employeeId.trim()) {
      validationErrors.employeeId = "Employee ID is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSuccess("Your attendance for today has been recorded successfully!");
    setFullName("");
    setEmployeeId("");
  };

  return (
    <section className="py-10 dark:bg-gray-900 sm:py-16 lg:py-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-green-600 sm:text-4xl lg:text-5xl">
            Attendance Page
          </h2>
        </div>

        <div className="relative max-w-md mx-auto mt-8 md:mt-16">
          <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-8 sm:px-10 sm:py-10">
              {success && <p className="mb-4 text-green-500">{success}</p>}

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="text-base font-medium text-gray-900 dark:text-gray-200">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full py-4 pl-4 pr-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.fullName && <p className="text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900 dark:text-gray-200">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Employee ID"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="block w-full py-4 pl-4 pr-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.employeeId && <p className="text-red-500 mt-1">{errors.employeeId}</p>}
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900 dark:text-gray-200">
                      Login Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={loginDateTime}
                      readOnly
                      className="block w-full py-4 pl-4 pr-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-4 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600"
                    >
                      Submit Attendance
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendancePage;
