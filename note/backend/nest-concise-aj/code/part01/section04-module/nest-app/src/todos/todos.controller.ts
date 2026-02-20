import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';

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
  create(@Body() body: { title: string }) {
    return this.todosService.createTodo(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { title: string }) {
    return this.todosService.updateTodo(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const todo = this.todosService.deleteTodo(+id);
    if (!todo) throw new NotFoundException({ message: 'Todo not found' });
    return todo;
  }
}
