import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import Sidebar from "../components/SideBar";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

function Completed() {
  const { tasks } = useTasks();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  //  Filter only completed tasks
  const completedTasks = tasks.filter(
    (t) => t.completed && !t.deleted
  );

  const formatCompletedDate = (date: string | null) => {
  if (!date) return "-";

  const completed = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (completed.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (completed.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return completed.toLocaleDateString("en-GB");
};

  return (
   <div className="bg-gray-100 min-h-screen dark:bg-gray-900">

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
        <div className="flex justify-between mt-1">
              <div className="flex flex-row gap-5 justify-start items-center">
            <div>
                <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden "
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
            <div>
              <div className="flex items-center gap-2 dark:text-white">
                  <CheckCircle2 className="w-10 h-10" />
                   <h2 className="text-lg md:text-4xl font-bold mb-2">All Completed Taks</h2>
              </div>
                <p className="text-gray-500 text-md md:text-lg mb-2 dark:text-white">
                    All tasks you have finished till today
                </p>

               
            </div>
           
        </div>
         <div>
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
      

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl mt-5 shadow p-6 min-h-[500px]">

          {/* Header */}
          <div className="hidden lg:grid grid-cols-6 text-blue-500 dark:text-blue-400 font-semibold border-b pb-3 text-xl">
            <p>Task</p>
            <p className="text-center">Category</p>
            <p className="text-center">Priority</p>
            <p className="text-center">Due Date</p>
            <p className="text-center">Status</p>
            <p className="text-center">Completed At</p> 
          </div>

          {/* Rows */}
          {completedTasks.length === 0 ? (
            <p className="text-gray-500 mt-4">No completed tasks yet</p>
          ) : (
            completedTasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-1 lg:grid-cols-6 items-center py-4 border-b"
              >
                {/* Task */}
                <div>
                  <p className="font-semibold line-through text-gray-400">
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {task.description}
                  </p>
                </div>

                {/* Category */}
                <p className="text-start lg:text-center my-2 lg:my-0 dark:text-gray-400">{task.category}</p>

                {/* Priority */}
                <p className="text-start lg:text-center my-2 lg:my-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      task.priority === "HIGH"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                </p>

                {/* Date */}
                <p className="text-start lg:text-center my-2 lg:my-0 dark:text-gray-400">
                  {new Date(task.dueDate).toLocaleDateString("en-GB")}
                </p>

                {/* Status */}
                <p className="text-start lg:text-center my-2 lg:my-0 text-green-600 font-medium">
                  Completed
                </p>
                {/* Completed At */}
                  <p className="text-start lg:text-center my-2 lg:my-0 text-gray-600 dark:text-gray-400">
                    {formatCompletedDate(task.completedAt)}
                  </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Completed;