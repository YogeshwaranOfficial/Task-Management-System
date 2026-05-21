import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import Completed from "./pages/Completed";
import DeletedTasks from "./pages/DeletedTasks";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";
import NotificationContainer from "./components/NotificationContainer";

function App() {

  return (
    <BrowserRouter>
    <ThemeProvider>
      <TaskProvider>
        <NotificationContainer/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/completed" element={<Completed />} />
              <Route path="/deleted" element={<DeletedTasks />} />
            </Routes>
      </TaskProvider>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;