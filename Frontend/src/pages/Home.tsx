import { useEffect, useState, useCallback } from "react";
import type { Task } from "../types/task";
import { useTasks } from "../context/TaskContext";
import Sidebar from "../components/SideBar";
import { useNotification } from "../context/NotificationContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Plus, Search, Trash2, Pencil, ChevronDown, ListTodo, BadgeCheck, Clock, AlertTriangle, Clipboard } from "lucide-react";

type TaskForm = {
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  category: "WORK" | "STUDY" | "PERSONAL";
  dueDate: string;
};

function Home() {
  const [searchtask, setSearchtask] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [addtask, setAddtask] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deletetask, setDeletetask ] = useState<boolean>(false);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"ALL" | "COMPLETED" | "PENDING">("ALL");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<"DATE" | "PRIORITY">("DATE");
  const [form, setForm] = useState<TaskForm>({title: "", description: "", priority: "LOW", category: "WORK", dueDate: ""});
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotification();
  const { tasks, addTask, editTask: updateTaskCtx, softDeleteTask } = useTasks();
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const handleDelete = async (id: number) => {
  try {
   await softDeleteTask(id);
   addNotification("Task deleted successfully", "success");
  } catch {
    addNotification("Something went wrong", "error");
  }
};

const handleFilterChange = (
  value: "ALL" | "COMPLETED" | "PENDING"
) => {
  setFilter(value);
  setCurrentPage(1);
};

const handleCategoryChange = (value: string) => {
  setCategoryFilter(value);
  setCurrentPage(1);
};

const handleSortChange = (
  value: "DATE" | "PRIORITY"
) => {
  setSortBy(value);
  setCurrentPage(1);
};

const handleSearchChange = (
  value: string
) => {
  setSearchtask(value);
  setCurrentPage(1);
};

  const checkDueTasks = useCallback((tasks: Task[]) => {
  const today = new Date();

  tasks.forEach((task) => {
    const due = new Date(task.dueDate);

    const todayDate = new Date(today.toDateString());
    const dueDate = new Date(due.toDateString());

    if (dueDate < todayDate && !task.completed) {
      addNotification(`Overdue: ${task.title}`, "warning");
    } else if (
      dueDate.getTime() === todayDate.getTime() &&
      !task.completed
    ) {
      addNotification(`Due today: ${task.title}`, "warning");
    }
  });
}, [addNotification]);

const handleToggle = async (id: number, completed: boolean) => {
  const updatedCompleted = !completed;

  const updatedCompletedAt = updatedCompleted
    ? new Date().toISOString()
    : null;

  await updateTaskCtx(id, {
    completed: updatedCompleted,
    completedAt: updatedCompletedAt,
  });
};

  const overdueCount = tasks.filter((t) => {
    const today = new Date().toDateString();
    const due = new Date(t.dueDate).toDateString();

    return !t.completed && !t.deleted && new Date(due) < new Date(today);
  }).length;

  

  const processedTasks = tasks
  .filter(task => {
    if (task.deleted) return false;
    if (filter === "COMPLETED") {
    if (!task.completed || !task.completedAt) return false;
      const today = new Date().toDateString();
      const completedDate = new Date(task.completedAt).toDateString();
      if (completedDate !== today) return false;
   }
   
    if (filter === "PENDING" && task.completed) return false;
    if (categoryFilter !== "ALL" && task.category !== categoryFilter) return false;

    const search = debouncedSearch.toLowerCase();
    if (
      !task.title.toLowerCase().includes(search) &&
      !(task.description || "").toLowerCase().includes(search)
    ) return false;

    return true;
  })
  .sort((a, b) => {
    if (sortBy === "DATE") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    if (sortBy === "PRIORITY") {
      const priorityOrder = {
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1,
      };

      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    return 0;
  });

  const startIndex = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = processedTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );
 const totalPages = Math.ceil(processedTasks.length / tasksPerPage);

  const handleClearFilters = () => {
    setFilter("ALL");
    setCategoryFilter("ALL");
    setSearchtask("");
    setDebouncedSearch("");
    setSortBy("DATE");
  };


  const highlightText = (text: string, search: string) => {
  if (!search) return text;

  const parts = text.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span key={index} className="bg-yellow-300 font-semibold rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};

useEffect(() => {
  checkDueTasks(tasks);
}, [tasks,checkDueTasks]);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchtask);
  }, 300); 
  return () => clearTimeout(timer);
}, [searchtask]);

 

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
        <div className="flex lg:flex-row justify-between items-center mb-6">
            <div className="flex flex-row gap-3">
              <div className="flex items-center">
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
          
              <div>
                <div className="flex items-center gap-2 dark:text-white">
                  <ListTodo className="w-10 h-9"/>
                  <h2 className="text-lg dark:text-white md:text-3xl font-bold text-start mb-2">To do list</h2>
                </div>
                   <p className="text-gray-500 dark:text-white text-md md:text-lg">Manage your tasks efficiently</p>
              </div>
            </div>

            <div className="flex flex-row gap-2">
             
              <button onClick={() => {
                    setAddtask(true);

                    setForm({
                      title: "",
                      description: "",
                      priority: "LOW",
                      category: "WORK",
                      dueDate: "",
                    });
                  }}
               className="flex items-center gap-2 bg-blue-600 hover:scale-105 text-white px-4 py-2 rounded-lg dark:hover:shadow-blue-300 dark:shadow-lg">
                  <Plus className="w-5 h-5" />
                  New Task
                </button>
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

        {/* Add task or Edit Task Popup card */}
       {(addtask || editTask) && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-2 sm:px-4">

            <div
              className="
                bg-white dark:bg-gray-900
                w-full sm:w-[90%] md:w-[75%] lg:w-[55%] xl:w-[40%]
                max-h-[90vh]
                rounded-xl
                p-4 sm:p-6
                shadow-lg
                overflow-y-auto
              "
            >
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl dark:text-white font-bold mb-4 sm:mb-6">
                {editTask ? 
                ( 
                <div className="flex items-center gap-2 dark:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 dark:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  Edit Task
                </div> 
                )
                : 
                (
                  <div className="flex items-center gap-2 dark:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                  </svg>
                  Add New Task
                </div> 
                )
                }
              </h2>

              <form
                onSubmit={async (e) => {
                      e.preventDefault();

                      try {
                        if (editTask) {
                          await updateTaskCtx(editTask.id, {
                            ...form,
                            dueDate: new Date(form.dueDate).toISOString(),
                          });

                          addNotification("Task updated successfully", "success");
                        } else {
                          await addTask({
                            ...form,
                            dueDate: new Date(form.dueDate).toISOString(),
                          });

                          addNotification("Task created successfully", "success");
                        }

                        //  CLOSE MODAL
                        setAddtask(false);
                        setEditTask(null);

                        //  RESET FORM
                        setForm({
                          title: "",
                          description: "",
                          priority: "LOW",
                          category: "WORK",
                          dueDate: "",
                        });

                      } catch (error) {
                      const message =
                        error instanceof Error
                          ? error.message
                          : "Something went wrong";

                      addNotification(message, "error");
                    }
                    }}
              >
                {/* Title */}
                <h2 className="text-gray-500 dark:text-white mb-1 ms-1">Title</h2>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-3 sm:p-4 mb-3 sm:mb-4 text-sm sm:text-base rounded bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />

                {/* Description */}
                <h2 className="text-gray-500 dark:text-white mb-1 ms-1">Description</h2>
                <textarea
                  rows={5}
                  className="w-full p-3 sm:p-4 mb-3 sm:mb-4 text-sm sm:text-base rounded-lg resize-y bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />

                {/* Priority */}
                <h2 className="text-gray-500 dark:text-white mb-1 ms-1">Priority</h2>
                <select
                  className="w-full p-3 sm:p-4 mb-3 sm:mb-4 text-sm sm:text-base rounded bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      priority: e.target.value as TaskForm["priority"],
                    })
                  }
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>

                {/* Category */}
                <h2 className="text-gray-500 mb-1 dark:text-white ms-1">Category</h2>
                <select
                  className="w-full p-3 sm:p-4 mb-3 sm:mb-4 text-sm sm:text-base rounded bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as TaskForm["category"],
                    })
                  }
                >
                  <option value="WORK">Work</option>
                  <option value="STUDY">Study</option>
                  <option value="PERSONAL">Personal</option>
                </select>

                {/* Due Date */}
                <h2 className="text-gray-500 mb-1 dark:text-white  ms-1">Due Date</h2>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 sm:p-4 mb-4 text-sm sm:text-base rounded bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 text-sm sm:text-lg">
                  <button
                    type="button"
                        onClick={() => {
                        setAddtask(false);
                        setEditTask(null);

                        setForm({
                          title: "",
                          description: "",
                          priority: "LOW",
                          category: "WORK",
                          dueDate: "",
                        });
                      }}
                    className="w-full sm:w-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                  >
                    {editTask ? "Save Changes" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete task Popup card */}
       {deleteTaskId !== null && deletetask && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-3 sm:px-4">

              <div
                className="
                  bg-white
                  w-full sm:w-[85%] md:w-[60%] lg:w-[40%] xl:w-[20%]
                  max-w-md
                  rounded-xl
                  p-5 sm:p-6
                  shadow-lg
                "
              >
                {/* Message */}
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-center">
                  Are you sure you want to delete?
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6">

                  {/* Cancel */}
                  <button
                    onClick={() => {
                      setDeleteTaskId(null);
                      setDeletetask(false);
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition"
                  >
                    Cancel
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      if (deleteTaskId !== null) {
                        handleDelete(deleteTaskId);
                        setDeleteTaskId(null);
                        setDeletetask(false);
                      }
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
        )}


        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 hover:bg-blue-100 dark:bg-gray-200 dark:hover:shadow-blue-100 dark:shadow-lg">
            <div className="flex items-center gap-2">
              <Clipboard className="w-5 h-5 text-gray-500 dark:text-gray-700"/>
              <p className="text-gray-500 text-md lg:text-lg my-1 dark:text-gray-700">Total Tasks</p>
            </div>
            <h2 className="text-md md:text-lg font-bold my-2">{tasks.filter(t => !t.deleted).length}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 hover:bg-blue-100 dark:bg-gray-200 dark:hover:shadow-blue-100 dark:shadow-lg">
            <div className="flex items-center gap-2">
               <BadgeCheck className="w-5 h-5 text-gray-500 dark:text-gray-700 "/>
               <p className="text-gray-500 text-md lg:text-lg my-1  dark:text-gray-700">Today Completed</p>
            </div>
            <h2 className="text-md md:text-lg font-bold my-2">
                  {
                    tasks.filter(t => {
                      const today = new Date().toDateString();
                      return (
                        t.completed &&
                        !t.deleted &&
                        t.completedAt &&
                        new Date(t.completedAt).toDateString() === today
                      );
                    }).length
                  }
                </h2>
          </div>
 
          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 hover:bg-blue-100 dark:bg-gray-200 dark:hover:shadow-blue-100 dark:shadow-lg">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-5 h-5"/>
              <p className="text-gray-500 text-md lg:text-lg my-1">Pending</p>
            </div>
            <h2 className="text-md md:text-lg font-bold my-2">
              {tasks.filter(t => !t.completed && !t.deleted).length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 hover:bg-blue-100 dark:bg-gray-200 dark:hover:shadow-blue-100 dark:shadow-lg">
            <div className="flex items-center gap-2 text-gray-500">
                <AlertTriangle className="w-5 h-5"/>
                 <p className="text-gray-500 text-md lg:text-lg my-1">Overdue</p>
            </div>       
            <h2 className="text-md md:text-lg font-bold my-2">{overdueCount}</h2>
          </div>
        </div>

        {/* Task Table */}
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow p-4 md:p-6 lg:p-8 min-h-[100px]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-5">

          {/* LEFT SIDE */}
          <h3 className="font-bold text-md md:text-lg lg:text-xl">
            All Tasks
          </h3>

          {/* RIGHT SIDE */}
          <div className="flex flex-wrap items-center gap-3 focus:ring-2 focus:ring-blue-500">

            {/* Filter Buttons */}
            <button
              onClick={() => handleFilterChange("ALL")}
              className={`px-4 py-2 rounded-lg text-sm md:text-md ${
                filter === "ALL" ? "bg-blue-600 text-white" : "bg-gray-200 dark:text-black dark:bg-gray-100 hover:bg-gray-300"
              }`}
            >
              All
            </button>            
            <button
              onClick={() => handleFilterChange("PENDING")}
              className={`px-4 py-2 rounded-lg text-sm md:text-md ${
                filter === "PENDING" ? "bg-yellow-500 text-white" : "bg-gray-200 dark:text-black hover:bg-gray-300"
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => handleFilterChange("COMPLETED")}
              className={`px-4 py-2 rounded-lg text-sm md:text-md ${
                filter === "COMPLETED" ? "bg-green-600 text-white" : "bg-gray-200 dark:text-black hover:bg-gray-300"
              }`}
            >
              Today Completed 
            </button>


            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as "DATE" | "PRIORITY")}
                className="
                dark:text-black
                  appearance-none
                  px-4 pr-10 py-2
                  text-sm md:text-md
                  rounded-lg
                  bg-gray-200 hover:bg-gray-300
                  focus:ring-2 focus:ring-blue-500
                  outline-none
                  w-full
                "
              >
                <option value="DATE">Sort by Due Date</option>
                <option value="PRIORITY">Sort by Priority</option>
              </select>

              {/* Custom Arrow */}
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 w-4 h-4" />
            </div>

             {/* Category Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="
                  dark:text-black
                    appearance-none
                    px-4 pr-10 py-2
                    text-sm md:text-md
                    focus:ring-2 focus:ring-blue-500
                    rounded-lg
                    bg-gray-200 hover:bg-gray-300
                    w-full
                    outline-none
                  "
                >
                  <option value="ALL">All Categories</option>
                  <option value="WORK">Work</option>
                  <option value="STUDY">Study</option>
                  <option value="PERSONAL">Personal</option>
                </select>

                {/* Custom Arrow */}
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 w-4 h-4"
                />
              </div>

              <button
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 text-sm md:text-md"
              >
                Clear Filters
              </button>

          </div>
        </div>
      <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
          
          <input
            type="text"
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search task here"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-300 dark:text-gray-800 dark:placeholder:text-gray-500 focus:bg-blue-100 transition-colors duration-300 outline-none "
          />
      </div>
        

        {/* Header (hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-6 text-blue-500 dark:text-blue-400 mt-5 font-semibold text-sm md:text-md uppercase tracking-wide border-b pb-3 px-4">
          <p>Task</p>
          <p className="text-center">Category</p>
          <p className="text-center">Priority</p>
          <p className="text-center">Due Date</p>
          <p className="text-center">Status</p>
          <p className="text-center">Actions</p>
        </div>
          
          {/* Tasks */}
          {paginatedTasks.length > 0 ? (
            <>
          {paginatedTasks.map((task) => {
            const isDueToday =
              !task.completed &&
              new Date(task.dueDate).toDateString() === new Date().toDateString();

            const isOverdue =
              !task.completed && new Date(task.dueDate) < new Date();

            const rowBg = isDueToday
              ? "bg-yellow-100 dark:bg-yellow-400"
              : isOverdue
              ? "bg-red-100 dark:bg-red-400"
              : "hover:bg-blue-100 dark:hover:bg-gray-700";

            const textColor =
              isDueToday || isOverdue
                ? "text-black"
                : "text-gray-800 dark:text-white";

    return (
      <div
        key={task.id}
        className={`border p-4 transition mt-5 lg:mt-0
          lg:grid lg:grid-cols-6 lg:items-center lg:gap-2 lg:border-0 lg:border-b
          ${rowBg} ${textColor}
        `}
      >
        {/* Task Info */}
        <div className="flex flex-col lg:px-2">
          <p
            onClick={() => setViewTask(task)}
            className={`font-semibold text-sm md:text-md ${
              task.completed ? "line-through opacity-50" : ""
            }`}
          >
            {highlightText(task.title, searchtask)}
          </p>

          <p className="line-clamp-1 text-sm md:text-md opacity-80">
            {highlightText(task.description || "", searchtask)}
          </p>
        </div>

        {/* Category */}
        <p className="mt-2 lg:mt-0 lg:text-center text-sm md:text-md">
          <span className="lg:hidden font-medium">Category: </span>
          {task.category}
        </p>

        {/* Priority */}
        <div className="mt-2 lg:mt-0 flex lg:justify-center">
          <span
            className={`px-3 py-1 text-sm md:text-md rounded-full font-medium ${
              task.priority === "HIGH"
                ? "bg-red-200 text-red-800"
                : task.priority === "MEDIUM"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {task.priority}
          </span>
        </div>

        {/* Due Date */}
        <p className="mt-2 lg:mt-0 lg:text-center text-sm md:text-md">
          <span className="lg:hidden font-medium">Due: </span>
          {new Date(task.dueDate).toLocaleDateString("en-GB")}
        </p>

        {/* Status */}
        <div className="mt-3 lg:mt-0 flex items-center gap-3 lg:justify-center">
          <button
            onClick={() => handleToggle(task.id, task.completed)}
            className={`relative w-11 h-5 rounded-full transition ${
              task.completed ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-md transform transition ${
                task.completed ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

          <span
            className={`text-xs md:text-sm px-3 py-1 rounded-full font-medium w-[100px] text-center ${
              task.completed
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-row lg:flex-col mt-3 lg:mt-0 gap-2 justify-start lg:justify-center">
          <button
            onClick={() => {
                setEditTask(task);

                setForm({
                  title: task.title,
                  description: task.description || "",
                  priority: task.priority,
                  category: task.category,
                  dueDate: task.dueDate.split("T")[0],
                });
              }}
            className="lg:mx-8 px-3 py-1 bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white rounded-lg text-sm md:text-md transition"
          >
            <div className="flex items-center gap-2">
              <Pencil className="w-4 h-4"/>
              Edit
            </div>
          </button>

          <button
            onClick={() => (
              setDeleteTaskId(task.id), setDeletetask(true)
            )}
            className="lg:mx-8 px-3 py-1 bg-red-500 hover:bg-red-600 hover:scale-105 text-white rounded-lg text-sm md:text-md transition"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4"/>
              Delete
            </div>
          </button>
        </div>
        <div className="flex justify-center items-center gap-3 mt-6">
 </div>
</div>    
   
  
  
  );
  })}

   {/* ✅ PAGINATION HERE (OUTSIDE MAP) */}
    <div className="flex justify-center items-center gap-3 mt-6">

      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
        className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-600"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
        className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>
    </>
  
) : (
  <div className="flex flex-col items-center justify-center py-16 text-gray-500">
    <Trash2 className="w-10 h-10 mb-3"/>
    <p className="text-lg md:text-xl font-semibold">
      No results found
    </p>
    <p className="text-sm md:text-md mt-2">
      Try changing search or filters
    </p>
  </div>
)}

          {viewTask && (
                    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
                      
                      <div className="bg-white w-[90%] md:w-[50%] lg:w-[40%] rounded-2xl p-6 shadow-xl relative">

                        {/* Close Button */}
                        <button
                          onClick={() => setViewTask(null)}
                          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-bold mb-4">
                          {viewTask.title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 mb-4">
                          {viewTask.description || "No description provided"}
                        </p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 text-sm md:text-base">

                          {/* Category */}
                          <div>
                            <p className="text-gray-500">Category</p>
                            <p className="font-medium">{viewTask.category}</p>
                          </div>

                          {/* Priority */}
                          <div>
                            <p className="text-gray-500">Priority</p>
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                viewTask.priority === "HIGH"
                                  ? "bg-red-100 text-red-600"
                                  : viewTask.priority === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                            >
                              {viewTask.priority}
                            </span>
                          </div>

                          {/* Due Date */}
                          <div>
                            <p className="text-gray-500">Due Date</p>
                            <p>
                              {new Date(viewTask.dueDate).toLocaleDateString("en-GB")}
                            </p>
                          </div>

                          {/* Status */}
                          <div>
                            <p className="text-gray-500">Status</p>
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                viewTask.completed
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {viewTask.completed ? "Completed" : "Pending"}
                            </span>
                          </div>

                          {/* Created At */}
                          <div className="col-span-2">
                            <p className="text-gray-500">Created At</p>
                            <p>
                              {new Date(viewTask.createdAt).toLocaleDateString("en-GB")}
                            </p>
                          </div>

                        </div>

                      </div>
                    </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;