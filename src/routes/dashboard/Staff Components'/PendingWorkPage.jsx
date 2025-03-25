import React, { useState } from "react";

const PendingWorkPage = () => {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Complete client report", status: "Pending" },
        { id: 2, name: "Update website homepage", status: "Pending" },
        { id: 3, name: "Fix login page bug", status: "Pending" },
    ]);

    const [showPopup, setShowPopup] = useState(false);
    const [taskToComplete, setTaskToComplete] = useState(null);

    const handleCompleteClick = (task) => {
        setTaskToComplete(task);
        setShowPopup(true);
    };

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
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pending Tasks</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {tasks.filter(t => t.status === "Pending").length} pending tasks
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">S.No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {tasks.map((task, index) => (
                                <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {task.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            task.status === "Pending" 
                                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" 
                                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                        }`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {task.status === "Pending" && (
                                            <button
                                                onClick={() => handleCompleteClick(task)}
                                                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Confirm Completion
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Are you sure you want to mark <span className="font-medium text-green-600 dark:text-green-400">"{taskToComplete.name}"</span> as completed?
                            </p>
                        </div>
                        <div className="px-6 py-4  flex justify-end space-x-3">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmCompletion}
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 rounded-md transition-colors"
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

export default PendingWorkPage;