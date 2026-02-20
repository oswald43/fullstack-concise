const todos = [
  { id: 1, title: "React" },
  { id: 2, title: "Vue" },
  { id: 3, title: "Angular" },
];

export function findAllTodos() {
  return todos;
}

export function findOneTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  return todo;
}

export function createTodo(newTodo) {
  const id = todos[todos.length - 1].id + 1;
  const todo = { id, ...newTodo };
  todos.push(todo);
  return todo;
}

export function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return null;

  const [deletedTodo] = todos.splice(index, 1);
  return deletedTodo;
}

export function updateTodo(id, newTodo) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return null;

  todos[index] = { id, ...newTodo };
  return todos[index];
}
