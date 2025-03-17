import { Router } from "express";
import { clickByUrlId, createUrlClicks } from "../controllers/click.controller.js";

const routes = Router();

// Routes
routes.route("/create-click").post(createUrlClicks);
routes.route("/click-by-urlid/:urlId").get(clickByUrlId);

export default routes;
