import React, { useState } from "react";

const PendingWorkPage = () => {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Complete client report", status: "Pending" },
        { id: 2, name: "Update website homepage", status: "Pending" },
        { id: 3, name: "Fix login page bug", status: "Pending" },
    ]);

    const [showPopup, setShowPopup] = useState(false);
    const [taskToComplete, setTaskToComplete] = useState(null);

    // Open confirmation popup
    const handleCompleteClick = (task) => {
        setTaskToComplete(task);
        setShowPopup(true);
    };

    // Mark task as completed
    const confirmCompletion = () => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskToComplete.id ? { ...task, status: "Completed" } : task
            )
        );
        setShowPopup(false);
        setTaskToComplete(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-900">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Pending Tasks</h2>

            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="border p-3 text-left text-gray-700 dark:text-white">#</th>
                        <th className="border p-3 text-left text-gray-700 dark:text-white">Task Name</th>
                        <th className="border p-3 text-left text-gray-700 dark:text-white">Status</th>
                        <th className="border p-3 text-center text-gray-700 dark:text-white">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.id} className="border dark:border-gray-700">
                            <td className="border p-3 text-gray-800 dark:text-white">{index + 1}</td>
                            <td className="border p-3 text-gray-800 dark:text-white">{task.name}</td>
                            <td className={`border p-3 font-semibold ${
                                task.status === "Pending" ? "text-red-600" : "text-green-600"
                            } dark:text-white`}>
                                {task.status}
                            </td>
                            <td className="border p-3 text-center">
                                {task.status === "Pending" && (
                                    <button
                                        onClick={() => handleCompleteClick(task)}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                                    >
                                        Complete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup for Confirmation */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Are you sure you want to mark <span className="text-green-600">{taskToComplete.name}</span> as completed?
                        </h3>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmCompletion}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                            >
                                Yes, Complete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingWorkPage;
