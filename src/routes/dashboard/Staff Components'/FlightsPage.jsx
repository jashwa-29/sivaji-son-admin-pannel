import { useState } from "react";

const FlightsPage = () => {
  // State for each input field
  const [customerId, setCustomerId] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [airline, setAirline] = useState("");
  const [sector, setSector] = useState("");
  const [timingClass, setTimingClass] = useState("");
  const [pnrTicketNumber, setPnrTicketNumber] = useState("");
  const [issuedStaffDetails, setIssuedStaffDetails] = useState("");

  // State for error messages
  const [errors, setErrors] = useState({});

  // State for confirmation popup
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!customerId) newErrors.customerId = "Customer ID is required";
    if (!passengerName) newErrors.passengerName = "Passenger Name is required";
    if (!issueDate) newErrors.issueDate = "Issue Date is required";
    if (!travelDate) newErrors.travelDate = "Travel Date is required";
    if (!airline) newErrors.airline = "Airline is required";
    if (!sector) newErrors.sector = "Sector is required";
    if (!timingClass) newErrors.timingClass = "Timing & Class is required";
    if (!pnrTicketNumber) newErrors.pnrTicketNumber = "PNR & Ticket Number is required";
    if (!issuedStaffDetails) newErrors.issuedStaffDetails = "Issued Staff Details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Show confirmation popup
      setShowConfirmation(true);
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  // Handle confirmation
  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      // Form is valid and confirmed, proceed with submission
      console.log("Form submitted successfully!");
      // Add your submission logic here (e.g., API call)
    }
    // Close the confirmation popup
    setShowConfirmation(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-5">Ticket Booking Details</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Customer ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer ID</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.customerId ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Customer ID"
          />
          {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
        </div>

        {/* Passenger Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Passenger Name</label>
          <input
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.passengerName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Passenger Name"
          />
          {errors.passengerName && <p className="text-red-500 text-sm mt-1">{errors.passengerName}</p>}
        </div>

        {/* Issue Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Issue Date</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.issueDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.issueDate && <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>}
        </div>

        {/* Travel Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Travel Date</label>
          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.travelDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.travelDate && <p className="text-red-500 text-sm mt-1">{errors.travelDate}</p>}
        </div>

        {/* Airline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Airline</label>
          <input
            type="text"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.airline ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Airline"
          />
          {errors.airline && <p className="text-red-500 text-sm mt-1">{errors.airline}</p>}
        </div>

        {/* Sector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sector (Flight No, Dep & Arr)</label>
          <input
            type="text"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.sector ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Flight No, Departure & Arrival"
          />
          {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector}</p>}
        </div>

        {/* Timing & Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Timing & Class</label>
          <input
            type="text"
            value={timingClass}
            onChange={(e) => setTimingClass(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.timingClass ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Timing & Class"
          />
          {errors.timingClass && <p className="text-red-500 text-sm mt-1">{errors.timingClass}</p>}
        </div>

        {/* PNR & Ticket Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">PNR & Ticket Number</label>
          <input
            type="text"
            value={pnrTicketNumber}
            onChange={(e) => setPnrTicketNumber(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.pnrTicketNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter PNR & Ticket Number"
          />
          {errors.pnrTicketNumber && <p className="text-red-500 text-sm mt-1">{errors.pnrTicketNumber}</p>}
        </div>

        {/* Issued Staff Details */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Issued Staff Details</label>
          <textarea
            value={issuedStaffDetails}
            onChange={(e) => setIssuedStaffDetails(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.issuedStaffDetails ? "border-red-500" : "border-gray-300"
            }`}
            rows="3"
            placeholder="Enter Issued Staff Details"
          />
          {errors.issuedStaffDetails && <p className="text-red-500 text-sm mt-1">{errors.issuedStaffDetails}</p>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Confirm Submission</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Are you sure you want to submit the form?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => handleConfirmation(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmation(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightsPage;