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
  const todo = { id: todos.length + 1, ...newTodo };
  todos.push(todo);
  return todo;
}

export function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return null;
  todos.splice(index, 1); // TODO
  return todos[index];
}

export function updateTodo(id, updatedTodo) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return null;
  todos[index] = { id, ...updatedTodo };
  return todos[index];
}
