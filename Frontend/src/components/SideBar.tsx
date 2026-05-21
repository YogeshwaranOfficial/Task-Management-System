import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, CheckCircle2, Trash2 } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded ${
      location.pathname === path
        ? "bg-blue-600"
        : "hover:bg-gray-700"
    }`;

  return (
    <div className="w-45 bg-[#003c80] text-white p-5 dark:bg-gray-800 space-y-6 min-h-screen">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>
        <h1 className="text-xl font-bold">Task Flow</h1>
      </div>
     
      

      <nav className="space-y-3">
        <Link to="/" className={linkClass("/")}>
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </div>
        </Link>

        <Link to="/calendar" className={linkClass("/calendar")}>
         <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5" />
          Calendar
         </div>
       
        </Link>

        <Link to="/completed" className={linkClass("/completed")}>
          <div className="flex items-center gap-2">
             <CheckCircle2 className="w-5 h-5" />
              All Completed
          </div>
        </Link>

        <Link to="/deleted" className={linkClass("/deleted")}>
          <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Deleted Tasks
          </div>       
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;