import express from "express";
// import { adminRoutes } from "./routes/index.routes.js";
// import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(cookieParser());

// Routes
// app.use("/api/v1/admin", adminRoutes);

export default app;
