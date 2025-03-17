import { Router } from "express";
import userRouter from "./user.routes.js";
import urlsRouter from "./urls.routes.js";
import clickRouter from "./click.routes.js";

const router = Router();

// Router
router.use("/user", userRouter);
router.use("/urls", urlsRouter);
router.use("/click", clickRouter);

export default router;
