import {
  findAllTodos,
  findOneTodo,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../services/todoService.js";

export function findAll(_req, res) {
  const todos = findAllTodos();
  return res.json(todos);
}

export function findOne(req, res) {
  const { id } = req.params;

  const todo = findOneTodo(Number(id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  return res.json(todo);
}

export function create(req, res) {
  const newTodo = req.body;

  const todo = createTodo(newTodo);
  return res.json(todo);
}

export function remove(req, res) {
  const { id } = req.params;

  const todo = deleteTodo(Number(id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  return res.json(todo);
}

export function update(req, res) {
  const { id } = req.params;
  const newTodo = req.body;

  const todo = updateTodo(Number(id), newTodo);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  return res.json(todo);
}
