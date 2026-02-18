import { Router } from "express";
import { getHello } from "../controllers/appController";

export const router = Router();
router.route("/").get(getHello);
