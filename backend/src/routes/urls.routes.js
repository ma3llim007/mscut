import { Router } from "express";
import authenticateAndVerify from "../middlewares/authenticateAndVerifyUser.js";
import { createUrl, deleteUrl, getUrlsByUserId } from "../controllers/urls.controller.js";

const router = Router();

router.route("/get-urls").get(authenticateAndVerify, getUrlsByUserId);
router.route("/create-url").post(authenticateAndVerify, createUrl);
router.route("/delete-url/:urlId").delete(authenticateAndVerify, deleteUrl);

export default router;
