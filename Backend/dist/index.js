"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://task-management-system-by-yogesh.vercel.app"
    ],
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use("/api/tasks", task_routes_1.default);
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
