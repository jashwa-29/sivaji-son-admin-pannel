import { useState, useEffect } from "react";

const FlightsPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    customerId: "",
    passengerName: "",
    issueDate: "",
    travelDate: "",
    airline: "",
    sector: "",
    timingClass: "",
    pnrTicketNumber: "",
    issuedStaffDetails: ""
  });

  // State for recent bookings
  const [recentBookings, setRecentBookings] = useState([]);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  // Airline and class options
  const airlineOptions = ["Select Airline", "Delta Airlines", "United Airlines", "American Airlines", "Emirates", "Qatar Airways", "Lufthansa", "British Airways", "Air France", "Singapore Airlines"];
  const timingClassOptions = ["Select Class", "Economy - Morning", "Economy - Afternoon", "Economy - Evening", "Business - Morning", "Business - Afternoon", "Business - Evening", "First Class - Morning", "First Class - Afternoon", "First Class - Evening"];

  // Load recent bookings from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem("flightBookings");
    if (savedBookings) {
      setRecentBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle date input click
  const handleDateClick = (fieldName) => {
    document.getElementById(fieldName).showPicker();
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerId.trim()) newErrors.customerId = "Customer ID is required";
    if (!formData.passengerName.trim()) newErrors.passengerName = "Passenger Name is required";
    if (!formData.issueDate) newErrors.issueDate = "Issue Date is required";
    if (!formData.travelDate) newErrors.travelDate = "Travel Date is required";
    if (!formData.airline || formData.airline === "Select Airline") newErrors.airline = "Airline is required";
    if (!formData.sector.trim()) newErrors.sector = "Sector is required";
    if (!formData.timingClass || formData.timingClass === "Select Class") newErrors.timingClass = "Timing & Class is required";
    if (!formData.pnrTicketNumber.trim()) newErrors.pnrTicketNumber = "PNR & Ticket Number is required";
    if (!formData.issuedStaffDetails.trim()) newErrors.issuedStaffDetails = "Issued Staff Details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      setShowConfirmation(true);
    }
    setIsSubmitting(false);
  };

  // Handle confirmation
  const handleConfirmation = (confirmed) => {
    setShowConfirmation(false);
    
    if (confirmed) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        // Save to recent bookings
        const newBooking = {
          ...formData,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        
        const updatedBookings = [newBooking, ...recentBookings].slice(0, 5);
        setRecentBookings(updatedBookings);
        localStorage.setItem("flightBookings", JSON.stringify(updatedBookings));
        
        // Reset form
        setFormData({
          customerId: "",
          passengerName: "",
          issueDate: "",
          travelDate: "",
          airline: "",
          sector: "",
          timingClass: "",
          pnrTicketNumber: "",
          issuedStaffDetails: ""
        });
        
        setIsSubmitting(false);
      }, 1500);
    }
  };

  // Fill form with recent booking
  const useRecentBooking = (booking) => {
    setFormData({
      customerId: booking.customerId,
      passengerName: booking.passengerName,
      issueDate: booking.issueDate,
      travelDate: booking.travelDate,
      airline: booking.airline,
      sector: booking.sector,
      timingClass: booking.timingClass,
      pnrTicketNumber: booking.pnrTicketNumber,
      issuedStaffDetails: booking.issuedStaffDetails
    });
  };

  // Handle delete booking
  const handleDeleteBooking = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteBooking = (confirmed) => {
    setShowDeleteConfirmation(false);
    
    if (confirmed) {
      const updatedBookings = recentBookings.filter(booking => booking.id !== bookingToDelete);
      setRecentBookings(updatedBookings);
      localStorage.setItem("flightBookings", JSON.stringify(updatedBookings));
    }
    
    setBookingToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Form Card */}
           <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-green-600">Flight Ticket Booking</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Please fill in all the required details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer ID */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Customer ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  errors.customerId 
                    ? "border-red-500 focus:ring-red-300 dark:focus:ring-red-700" 
                    : "border-gray-300 dark:border-gray-600 focus:border-green-600 focus:ring-green-200 dark:focus:ring-green-800"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="CUST-12345"
              />
              {errors.customerId && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.customerId}
                </p>
              )}
            </div>

            {/* Passenger Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Passenger Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="passengerName"
                value={formData.passengerName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  errors.passengerName 
                    ? "border-red-500 focus:ring-red-300 dark:focus:ring-red-700" 
                    : "border-gray-300 dark:border-gray-600 focus:border-green-600 focus:ring-green-200 dark:focus:ring-green-800"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="John Doe"
              />
              {errors.passengerName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.passengerName}
                </p>
              )}
            </div>

            {/* Issue Date */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Issue Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="issueDate"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                    errors.issueDate 
                      ? "border-red-500 focus:ring-red-300 dark:focus:ring-red-700" 
                      : "border-gray-300 dark:border-gray-600 focus:border-green-600 focus:ring-green-200 dark:focus:ring-green-800"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                <div 
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => handleDateClick("issueDate")}
                ></div>
                {formData.issueDate && (
                  <div className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 pointer-events-none">
                    {formatDate(formData.issueDate)}
                  </div>
                )}
              </div>
              {errors.issueDate && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.issueDate}
                </p>
              )}
            </div>

            {/* Travel Date */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Travel Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="travelDate"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                    errors.travelDate 
                      ? "border-red-500 focus:ring-red-300 dark:focus:ring-red-700" 
                      : "border-gray-300 dark:border-gray-600 focus:border-green-600 focus:ring-green-200 dark:focus:ring-green-800"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                <div 
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => handleDateClick("travelDate")}
                ></div>
                {formData.travelDate && (
                  <div className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 pointer-events-none">
                    {formatDate(formData.travelDate)}
                  </div>
                )}
              </div>
              {errors.travelDate && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.travelDate}
                </p>
              )}
            </div>

            {/* Airline */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Airline <span className="text-red-500">*</span>
              </label>
              <select
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  errors.airline 
                    ? "border-red-500 focus:ring-red-300 dark:focus:ring-red-700" 
                    : "border-gray-300 dark:border-gray-600 focus:border-green-600 focus:ring-green-200 dark:focus:ring-green-800"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              >
                {airlineOptions.map((option, index) => (
                  <option key={index} value={option} disabled={index === 0}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.airline && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.airline}
                </p>
              )}
            </div>

            {/* Sector */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sector (Flight No, Dep & Arr) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  errors.sector 
                    ? "border-red-500 focus:ring-red-300 dark:focus:ring-red-700" 
                    : "border-gray-300 dark:border-gray-600 focus:border-green-600 focus:ring-green-200 dark:focus:ring-green-800"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="UA123 (JFK-LAX)"
              />
              {errors.sector && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.sector}
                </p>
              )}
            </div>

            {/* Timing & Class */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Timing & Class <span className="text-red-500">*</span>
              </label>
              <select
                name="timingClass"
                value={formData.timingClass}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  errors.timingClass 
                    ? "border-red-500 focus:ring-red-300 dark:focus:ring-red-700" 
                    : "border-gray-300 dark:border-gray-600 focus:border-green-600 focus:ring-green-200 dark:focus:ring-green-800"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              >
                {timingClassOptions.map((option, index) => (
                  <option key={index} value={option} disabled={index === 0}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.timingClass && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.timingClass}
                </p>
              )}
            </div>

            {/* PNR & Ticket Number */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                PNR & Ticket Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pnrTicketNumber"
                value={formData.pnrTicketNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  errors.pnrTicketNumber 
                    ? "border-red-500 focus:ring-red-300 dark:focus:ring-red-700" 
                    : "border-gray-300 dark:border-gray-600 focus:border-green-600 focus:ring-green-200 dark:focus:ring-green-800"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="PNR12345 / TK12345678"
              />
              {errors.pnrTicketNumber && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.pnrTicketNumber}
                </p>
              )}
            </div>

            {/* Issued Staff Details */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Issued Staff Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="issuedStaffDetails"
                value={formData.issuedStaffDetails}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  errors.issuedStaffDetails 
                    ? "border-red-500 focus:ring-red-300 dark:focus:ring-red-700" 
                    : "border-gray-300 dark:border-gray-600 focus:border-green-600 focus:ring-green-200 dark:focus:ring-green-800"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                rows="3"
                placeholder="Staff name, ID, and contact information"
              />
              {errors.issuedStaffDetails && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.issuedStaffDetails}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center ${
                  isSubmitting
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
                } min-w-[150px]`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>

          {/* Confirmation Popup */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Confirm</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Are you sure you want to submit this flight booking? Please verify all details before confirmation.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleConfirmation(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirmation(true)}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Bookings Card */}
        {recentBookings.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-green-600 mb-6">Recent Bookings</h3>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition relative"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBooking(booking.id);
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <div 
                    className="cursor-pointer"
                    onClick={() => useRecentBooking(booking)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          <span className="text-green-600">Passenger:</span> {booking.passengerName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-green-600">Customer ID:</span> {booking.customerId}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-green-600">Airline:</span> {booking.airline}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-green-600">Sector:</span> {booking.sector}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-green-600">Class:</span> {booking.timingClass}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-green-600">PNR:</span> {booking.pnrTicketNumber}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-green-600">Issue Date:</span> {formatDate(booking.issueDate)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-green-600">Travel Date:</span> {formatDate(booking.travelDate)}
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-green-600">Staff Details:</span> {booking.issuedStaffDetails}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Created: {formatDate(booking.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Delete Booking</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this booking? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => confirmDeleteBooking(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDeleteBooking(true)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Submission Confirmation Popup */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Confirm</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to submit this flight booking? Please verify all details before confirmation.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleConfirmation(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmation(true)}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsPage;