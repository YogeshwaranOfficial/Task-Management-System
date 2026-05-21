import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import type { Task } from "../types/task";

type Props = {
  tasks: Task[];
  onDateSelect?: (date: string) => void;
};

function TaskCalendar({ tasks }: Props) {
  const [date, setDate] = useState<Date>(new Date());

  // filter tasks for selected date
  const tasksForDate = tasks.filter(task => {
    if (task.deleted) return false;
    return (
      new Date(task.dueDate).toDateString() === date.toDateString()// string to js object then date to string 
    );
  });

  return (
    <div className="p-6 overflow-hidden">

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 h-full">

        {/* LEFT side Calendar */}
        <div className="dark:bg-gray-800 p-4 flex justify-center items-start">
          <Calendar
            onChange={(value) => setDate(value as Date)}
            value={date}
            className="react-calendar-custom"
          />
        </div>

        {/* RIGHT sdie Task Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 dark:text-white rounded-2xl p-6 flex flex-col">

          {/* Header */}
          <h2 className="text-2xl font-bold mb-4">
            Tasks on {date.toDateString()}
          </h2>

          {/* Task List */}
          <div className="flex-1 overflow-y-auto space-y-3">

            {tasksForDate.length === 0 ? (
              <p className="text-gray-500 dark:text-white text-center mt-10">
                No tasks for this date 🚀
              </p>
            ) : (
              tasksForDate.map(task => (
                <div
                  key={task.id}
                  className="p-4 rounded-xl border border-gray-300 dark:border-gray-500 hover:shadow-md transition flex justify-between items-start"
                >
                  {/* Left Content */}
                  <div>
                    <p className="font-semibold text-lg">
                      {task.title}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex gap-3 mt-2 text-xs">
                      <span className="px-2 py-1 bg-gray-100 dark:text-black rounded">
                        {task.category}
                      </span>

                      <span
                        className={`px-2 py-1 rounded ${
                          task.priority === "HIGH"
                            ? "bg-red-100 text-red-600"
                            : task.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        task.completed
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default TaskCalendar;