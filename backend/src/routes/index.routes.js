import { Router } from "express";
import userRouter from "./user.routes.js";
import urlsRouter from "./urls.routes.js";

const router = Router();

// Router
router.use("/user", userRouter);
router.use("/urls", urlsRouter);

export default router;
