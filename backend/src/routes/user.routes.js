import { Router } from "express";
import { changePassword, login, logoutUser, register } from "../controllers/user.controller.js";
import authenticateAndVerify from "../middlewares/authenticateAndVerifyUser.js";

const router = Router();

// Router
router.route("/register").post(register);
router.route("/login").post(login);

// Protected Router
router.route("/log-out").post(authenticateAndVerify, logoutUser);
router.route("/change-password").post(authenticateAndVerify, changePassword);

export default router;
