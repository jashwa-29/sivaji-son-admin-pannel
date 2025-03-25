import { useState, useEffect } from "react";

const AttendancePage = () => {
  const [fullName, setFullName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentRecords, setRecentRecords] = useState([]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentDateTime(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setIsSubmitting(true);

    let validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = "Full Name is required.";
    }

    if (!employeeId.trim()) {
      validationErrors.employeeId = "Employee ID is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      const newRecord = {
        id: Date.now(),
        fullName,
        employeeId,
        date: currentDateTime,
      };

      setRecentRecords((prevRecords) => [newRecord, ...prevRecords]);
      setSuccess("Your attendance for today has been recorded successfully!");
      setShowSuccess(true);
      setFullName("");
      setEmployeeId("");
      setIsSubmitting(false);
    }, 1500);
  };

  const handleDelete = (id) => {
    setRecentRecords(recentRecords.filter((record) => record.id !== id));
  };

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-green-50 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Please enter your details to record today's attendance
          </p>
        </div>

        <div className="relative max-w-md mx-auto mt-12 md:mt-16">
          <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
            <div className="px-8 py-10 sm:px-10 sm:py-12">
              {showSuccess && (
                <div className="p-4 mb-6 text-center bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800 animate-fade-in">
                  <h3 className="mt-3 text-lg font-medium text-green-800 dark:text-green-200">
                    Success!
                  </h3>
                  <p className="mt-2 text-green-600 dark:text-green-300">{success}</p>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Employee ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="EMP-12345"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="block w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Date & Time
                    </label>
                    <div className="p-3 px-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                      <p className="text-gray-900 dark:text-gray-200 font-medium">
                        {currentDateTime}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 animate-fade-in">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3.5 text-lg font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600"
                    >
                      {isSubmitting ? "Processing..." : "Submit Attendance"}
                    </button>
                  </div>
                </div>
              </form>


            </div>

            
          </div>

                        {/* Recent Attendance List */}
                        {recentRecords.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Recent Attendance
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {recentRecords.map((record) => (
                      <li
                        key={record.id}
                        className="flex justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                      >
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {record.fullName} ({record.employeeId})
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{record.date}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400"
                        >
                          ❌
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
        </div>
      </div>
    </section>
  );
};

export default AttendancePage;
