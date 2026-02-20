import { Injectable } from '@nestjs/common';

const todos = [
  { id: 1, title: 'React' },
  { id: 2, title: 'Vue' },
  { id: 3, title: 'Angular' },
];

@Injectable()
export class TodosService {
  findAllTodos() {
    return todos;
  }

  findOneTodo(id: number) {
    const todo = todos.find((todo) => todo.id === id);
    return todo;
  }

  createTodo(newTodo: { title: string }) {
    const id = todos[todos.length - 1].id + 1;
    const todo = { id, ...newTodo };
    todos.push(todo);
    return todo;
  }

  deleteTodo(id: number) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    const [deletedTodo] = todos.splice(index, 1);
    return deletedTodo;
  }

  updateTodo(id: number, newTodo: { title: string }) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    todos[index] = { id, ...newTodo };
    return todos[index];
  }
}
