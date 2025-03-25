import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const RemindingCustomerPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", booking: "Flight", date: "2023-10-25" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", booking: "Hotel", date: "2023-10-25" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", booking: "Flight", date: "2023-10-25" },
  ]);

  const [recentlyNotified, setRecentlyNotified] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const handleNotifyClick = (customer) => {
    setSelectedCustomer(customer);
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      setRecentlyNotified((prev) => [selectedCustomer, ...prev]);
    }
    setShowConfirmation(false);
  };

  const handleRemoveNotified = (index) => {
    setCustomerToDelete(index);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = (confirmed) => {
    if (confirmed && customerToDelete !== null) {
      setRecentlyNotified((prev) => prev.filter((_, i) => i !== customerToDelete));
    }
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Customers to Notify for Tomorrow 
        </h2>

        {/* Customer Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse">
            <thead className="dark:bg-gray-800 bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">S.no</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Booking</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                  <td className="p-4 font-medium text-sm text-gray-700 dark:text-gray-300">{customer.name}</td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{customer.email}</td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{customer.booking}</td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{customer.date}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleNotifyClick(customer)}
                      className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition"
                    >
                      Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recently Notified Customers */}
        {recentlyNotified.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 ">
              Recently Notified Customers
            </h3>
            <div className="overflow-x-auto  rounded-lg">
              <table className="w-full border-collapse">
                <thead className="dark:bg-gray-800 bg-gray-100">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">S.no</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Booking</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentlyNotified.map((customer, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-gray-200 dark:border-gray-700">
                      <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                      <td className="p-4 font-medium text-sm text-gray-700 dark:text-gray-300">{customer.name}</td>
                      <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{customer.email}</td>
                      <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{customer.booking}</td>
                      <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{customer.date}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleRemoveNotified(index)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Delete"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Confirmation Pop-up for Notification */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Are you sure you want to notify {selectedCustomer?.name}?
              </h3>
              <div className="flex justify-end space-x-4">
                <button onClick={() => handleConfirmation(false)} className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-md">
                  No
                </button>
                <button onClick={() => handleConfirmation(true)} className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Pop-up for Deletion */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this entry?</h3>
              <div className="flex justify-end space-x-4">
                <button onClick={() => confirmDelete(false)} className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-md">No</button>
                <button onClick={() => confirmDelete(true)} className="bg-red-500 text-white px-4 py-2 rounded-md">Yes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindingCustomerPage;
