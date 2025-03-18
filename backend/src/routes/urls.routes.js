import { Router } from "express";
import authenticateAndVerify from "../middlewares/authenticateAndVerifyUser.js";
import { createUrl, deleteUrl, getUrlsByUserId, redirectUrl, storeClicks, urlByUrlId } from "../controllers/urls.controller.js";

const router = Router();

router.route("/get-urls").get(authenticateAndVerify, getUrlsByUserId);
router.route("/url/:urlId").get(authenticateAndVerify, urlByUrlId);
router.route("/create-url").post(authenticateAndVerify, createUrl);
router.route("/delete-url/:urlId").delete(authenticateAndVerify, deleteUrl);

router.route("/redirect/:url").get(redirectUrl);
router.route("/stock-click/:urlId").post(storeClicks);

export default router;
