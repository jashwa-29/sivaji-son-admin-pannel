import { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

const AssignTask = () => {
  const [staff, setStaff] = useState([
    { id: 1, username: "john_doe" },
    { id: 2, username: "jane_smith" },
    { id: 3, username: "alice_williams" },
    { id: 4, username: "bob_johnson" },
    { id: 5, username: "charlie_brown" },
  ]);

  const [modal, setModal] = useState({ type: "", isOpen: false, staff: null });
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const openModal = (type, staff = null) => setModal({ type, isOpen: true, staff });
  const closeModal = () => {
    setModal({ type: "", isOpen: false, staff: null });
    setTaskDescription("");
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    if (taskDescription.trim() === "") return;

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newTask = {
      id: Date.now(),
      staffName: modal.staff?.username,
      description: taskDescription,
      date,
      time,
      status: "Pending",
    };

    setAssignedTasks([newTask, ...assignedTasks]);
    closeModal();
  };

  const handleDeleteTask = (taskId) => {
    setAssignedTasks(assignedTasks.filter((task) => task.id !== taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    setAssignedTasks(
      assignedTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Assign Task</h1>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full">
            <thead className="dark:bg-gray-800 bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">S.No</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s, index) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                  <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{s.username}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openModal("assign", s)}
                      className="dark:text-white dark:hover:text-green-300 text-white bg-green-600 p-2 rounded-md hover:bg-green-700 transition-colors"
                      title="Assign Task"
                    >
                      Assign Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Assign Task Modal */}
        {modal.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="dark:bg-gray-800 dark:text-white bg-white rounded-lg shadow-xl w-full max-w-xl transform transition-all duration-300 ease-in-out">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold capitalize">Assign Task to {modal.staff?.username}</h2>
                  <button
                    onClick={closeModal}
                    className="dark:text-gray-300 dark:hover:text-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleAssignTask}>
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Enter task details..."
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={5}
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Assign Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmation !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="dark:bg-gray-800 dark:text-white bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Confirm Deletion</h2>
                  <button
                    onClick={() => setDeleteConfirmation(null)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
                <p className="mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setDeleteConfirmation(null)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteTask(deleteConfirmation);
                      setDeleteConfirmation(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Assigned Task List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Assigned Tasks</h2>
          <div className="space-y-4">
            {assignedTasks.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No tasks assigned yet.</p>
            ) : (
              assignedTasks.map((task) => (
                <div
                  key={task.id}
                  className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{task.staffName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {task.date} at {task.time}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        onClick={() => setDeleteConfirmation(task.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete task"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{task.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTask;