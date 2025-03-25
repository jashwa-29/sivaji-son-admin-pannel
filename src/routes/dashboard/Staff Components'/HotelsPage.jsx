import React, { useState } from "react";

const HotelsPage = () => {
  // State for each input field
  const [bookingId, setBookingId] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [numberOfNights, setNumberOfNights] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hcn, setHcn] = useState("");
  const [hotelContactPerson, setHotelContactPerson] = useState("");

  // State for error messages
  const [errors, setErrors] = useState({});

  // State for confirmation popup
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!bookingId) newErrors.bookingId = "Booking ID is required";
    if (!hotelName) newErrors.hotelName = "Hotel Name is required";
    if (!numberOfNights) newErrors.numberOfNights = "Number of Nights is required";
    if (!checkInDate) newErrors.checkInDate = "Check-in Date is required";
    if (!checkOutDate) newErrors.checkOutDate = "Check-out Date is required";
    if (!hcn) newErrors.hcn = "HCN is required";
    if (!hotelContactPerson) newErrors.hotelContactPerson = "Hotel Contact Person is required";

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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-5">Hotel Booking Details</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Booking ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Booking ID</label>
          <input
            type="text"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.bookingId ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Booking ID"
          />
          {errors.bookingId && <p className="text-red-500 text-sm mt-1">{errors.bookingId}</p>}
        </div>

        {/* Hotel Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hotel Name</label>
          <input
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.hotelName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Hotel Name"
          />
          {errors.hotelName && <p className="text-red-500 text-sm mt-1">{errors.hotelName}</p>}
        </div>

        {/* No. of Nights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">No. of Nights</label>
          <input
            type="number"
            value={numberOfNights}
            onChange={(e) => setNumberOfNights(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.numberOfNights ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Number of Nights"
          />
          {errors.numberOfNights && <p className="text-red-500 text-sm mt-1">{errors.numberOfNights}</p>}
        </div>

        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-in Date</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.checkInDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-out Date</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.checkOutDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>}
        </div>

        {/* HCN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">HCN</label>
          <input
            type="text"
            value={hcn}
            onChange={(e) => setHcn(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.hcn ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter HCN"
          />
          {errors.hcn && <p className="text-red-500 text-sm mt-1">{errors.hcn}</p>}
        </div>

        {/* Hotel Contact Person */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hotel Contact Person</label>
          <input
            type="text"
            value={hotelContactPerson}
            onChange={(e) => setHotelContactPerson(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.hotelContactPerson ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Contact Person's Name"
          />
          {errors.hotelContactPerson && <p className="text-red-500 text-sm mt-1">{errors.hotelContactPerson}</p>}
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

export default HotelsPage;