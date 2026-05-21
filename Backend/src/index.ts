import express from "express";
import cors  from 'cors';
import router from "./routes/task.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-management-system-by-yogeshwaran.vercel.app"    
  ],
  credentials: true
}));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/tasks", router);

// app.listen(5000,()=>{
//     console.log("Server running on port 5000");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//to check the other server running netstat -ano | findstr :PORT and kill it with taskkill /PID <ID> /F


// Use this json body for api testing 
// {
//   "title": "Learn Backend",
//   "description": "Finish Prisma setup",
//   "priority": "HIGH",
//   "category": "STUDY",
//   "dueDate": "2026-04-30T10:00:00.000Z"
// }