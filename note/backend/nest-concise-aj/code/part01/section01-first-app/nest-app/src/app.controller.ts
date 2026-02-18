import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // Who provides: TS ❌, NodeJS ❌, NestJS Module ✅
  // Use Dependency Injection to inject AppService instance
  // instead of creating a new instance manually
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
