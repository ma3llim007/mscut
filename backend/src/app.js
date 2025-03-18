import express from "express";
import Router from "./routes/index.routes.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
});

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(limiter);
app.use(
    compression({
        level: 6,
        threshold: 1024,
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }
            return compression.filter(req, res);
        },
    })
);

// Routes
app.use("/api/v1/", Router);

export default app;
