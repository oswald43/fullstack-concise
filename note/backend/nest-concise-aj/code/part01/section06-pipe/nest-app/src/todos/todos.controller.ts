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
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAllTodos();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   // +id as number ✅
  //   const todo = this.todosService.findOneTodo(+id);
  //   if (!todo) throw new NotFoundException();
  //   return todo;
  // }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   // Route parameter pipes ✅
  //   const todo = this.todosService.findOneTodo(id);
  //   if (!todo) throw new NotFoundException();
  //   return todo;
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // Global pipes ✅
    const todo = this.todosService.findOneTodo(id);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  @Post()
  create(@Body() body: CreateTodoDto) {
    return this.todosService.createTodo(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateTodoDto) {
    return this.todosService.updateTodo(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
    const todo = this.todosService.deleteTodo(id);
    if (!todo)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Todo not found' });
    return { message: 'Todo deleted' }; // Because @Res, if there is no passthrough, the request will never get a reply.
  }
}
