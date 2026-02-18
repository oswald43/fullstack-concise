import { Router } from "express";
import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from "../controllers/todoController.js";

export const todoRouter = Router();
todoRouter.route("/todos").get(findAll).post(create);
todoRouter.route("/todos/:id").get(findOne).put(update).delete(remove);
