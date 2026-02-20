import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAllTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const todo = this.todosService.findOneTodo(+id);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  @Post()
  create(@Body() body: CreateTodoDto) {
    return this.todosService.createTodo(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    return this.todosService.updateTodo(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const todo = this.todosService.deleteTodo(+id);
    if (!todo)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Todo not found' });
    return { message: 'Todo deleted' }; // Because @Res, if there is no passthrough, the request will never get a reply.
  }
}
