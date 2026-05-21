const dotenv=require("dotenv");
dotenv.config();

const express=require("express");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>
{
    res.send("APP IS RUNNING.....");
});

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>
{
    console.log(`server is running on port ${PORT}`);
});

const connectDB=require("./config/database");
connectDB();

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);