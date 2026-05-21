import Sidebar from "../components/SideBar";
import { useTasks } from "../context/TaskContext";
import { useNotification } from "../context/NotificationContext";
import { Trash2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

function DeletedTasks() {
  const { tasks, restoreTask, permanentDeleteTask } = useTasks();
  const { addNotification } = useNotification();
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [confirmAll, setConfirmAll] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme} = useTheme();

  // Only deleted tasks
  const deletedTasks = tasks.filter((t) => t.deleted);

  // Restore
  const handleRestore = async (id: number) => {
    try {
      await restoreTask(id);
      addNotification("Task restored", "success");
    } catch {
      addNotification("Failed to restore","error");
    }
  };

  //  Permanent delete (single)
  const confirmDelete = async () => {
    if (confirmId === null) return;

    try {
      await permanentDeleteTask(confirmId);
      addNotification("Task permanently deleted","success");
    } catch {
      addNotification("Delete failed","error");
    } finally {
      setConfirmId(null);
    }
  };

  //  Clear all trash
  const handleClearAll = async () => {
    try {
    await Promise.all(
      deletedTasks.map((task) => permanentDeleteTask(task.id))
    );
      addNotification("Trash cleared","success");
    } catch {
      addNotification("Failed to clear trash","error");
    } finally {
      setConfirmAll(false);
    }
  };

  return (
   <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

 {/* Sidebar */}
    <div
      className={`
        fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <Sidebar />
    </div>

    {sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

  {/* Main Content */}
  <div className="p-4 sm:p-6 lg:ml-64 overflow-y-auto h-screen">

        {/* Header */}
        <div className="flex flex-row gap-5 justify-between items-center mb-3">
          <div className="flex flex-row gap-5 justify-start items-center">      
                <div>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                </div>
                <div className="dark:text-white">
                  <div className="flex items-center gap-2">
                    <Trash2 className="w-10 h-10" />
                    <h1 className="text-lg md:text-4xl font-bold mb-2">Deleted Tasks</h1>
                  </div>
                
                  <p className="text-gray-500 text-md md:text-lg dark:text-gray-300">
                    Manage your trash
                  </p>
                </div>
          </div>
          <div className="flex items-center gap-2 ">
              {deletedTasks.length > 0 && (
                    <button
                    onClick={() => setConfirmAll(true)}
                    className="px-2 py-2 md:px-4 md:py-2 text-sm md:text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                  >
                    Clear All Trash
                  </button>
               )}
               <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg dark:bg-gray-200 bg-gray-700 hover:scale-105 transition"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-5 h-5 text-black" />
                        <span className="dark:text-black">Light</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 text-white" />
                        <span className="text-white">Dark</span>
                      </>
                    )}
                  </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 min-h-[500px]">

          {deletedTasks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No deleted tasks</p>
              <p className="text-gray-400 mt-2">
                Your trash is empty
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {deletedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border dark:border-gray-500 hover:shadow-md transition"
                >
                  {/* Info */}
                  <div className="flex-1">
                    <p className="font-semibold text-lg line-through text-gray-400">
                      {task.title}
                    </p>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {task.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {task.category} •{" "}
                      {new Date(task.dueDate).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4 md:mt-0">

                    {/* Restore */}
                    <button
                      onClick={() => handleRestore(task.id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                    >
                      Restore
                    </button>

                    {/* Delete Forever */}
                    <button
                      onClick={() => setConfirmId(task.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                    >
                      Delete Forever
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ❗ Confirm Single Delete Modal */}
        {confirmId !== null && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow w-[90%] max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Delete permanently?
              </h2>
              <p className="text-gray-500 mb-6">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmId(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🧹 Confirm Clear All Modal */}
        {confirmAll && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow w-[90%] max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Clear all trash?
              </h2>
              <p className="text-gray-500 mb-6">
                This will permanently delete all tasks in trash.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmAll(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default DeletedTasks;