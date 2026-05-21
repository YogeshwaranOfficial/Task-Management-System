import { useState } from "react";
import Sidebar from "../components/SideBar";
import TaskCalendar from "../components/TaskCalendar";
import { useTasks } from "../context/TaskContext";
import { CheckSquare } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

function CalendarPage() {
  const { tasks } = useTasks();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
        <div className="flex flex-row justify-between items-center">
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
            <div className="flex items-center gap-2">
              <CheckSquare className="w-10 h-10 dark:text-white" />
              <h1 className="text-lg md:text-4xl font-bold mb-2 dark:text-white">Calendar</h1>
            </div>
            <p className="text-gray-500 text-md md:text-lg dark:text-white">
              Manage tasks by selecting a date
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

        {/* Calendar Section (Full Focus UI) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 h-auto mt-5 min-h-[500px]">

          <TaskCalendar tasks={tasks} />

        </div>

      </div>
    </div>
  );
}

export default CalendarPage;