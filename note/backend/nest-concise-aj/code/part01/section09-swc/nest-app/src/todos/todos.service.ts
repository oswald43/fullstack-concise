import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

const todos: Todo[] = [
  { id: 1, title: 'React', content: 'react compiler', isCompleted: false },
  { id: 2, title: 'Vue', content: 'vue router', isCompleted: true },
  { id: 3, title: 'Angular', content: 'angular cli', isCompleted: false },
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

  createTodo(newTodo: CreateTodoDto) {
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

  updateTodo(id: number, newTodo: UpdateTodoDto) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    todos[index] = { ...todos[index], ...newTodo, id };
    return todos[index];
  }
}
