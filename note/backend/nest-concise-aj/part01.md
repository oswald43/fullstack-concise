# Welcome

## Why NestJS

- http://github.com/nestjs/nest
- https://github.com/spring-projects/spring-boot
- https://www.star-history.com/#nestjs/nest&spring-projects/spring-boot&type=date&legend=top-left

![Star History Chart](https://api.star-history.com/svg?repos=nestjs/nest,spring-projects/spring-boot&type=date&legend=top-left)

## Why not Express

> Express is non-prescriptive and allows you to set up a server in whatever way you see fit. This is great for flexibility, **but bad for consistency in large teams**.
>
> -- PayPal tech blog team

## No Include

- 1 hour
- zh docs (third parties)

## Include

- problems -> try to solve -> learn new tech ...

## Content

- RESTful in Nestjs, Database/ORM in Nestjs, Security
- GraphQL, Test(Vitest), 3rd-part integration(supabase, neon, log, datadog, sentry)

## Prerequisites

- NodeJS (Foundational concepts in back-end development)
- NodeJS-TS

## Expiration

- Nest Concise 2026-02-09 `nest@11.1.13` https://www.bilibili.com/video/BV1DbcMzbEkw https://github.com/13RTK/nestjs-concise

# First Application

## Express

- https://expressjs.com/

## Nest (cli)

- https://docs.nestjs.com/#installation
- https://docs.nestjs.com/cli/overview
- https://docs.nestjs.com/cli/usages#nest-new

```shell
pnpm i -g @nestjs/cli
nest --version  # 11.0.1

nest new nest-app -g -s
pnpm start:dev
```

```json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.1", // ✅
    "@nestjs/core": "^11.0.1", // ✅
    "@nestjs/platform-express": "^11.0.1", // ✅ a wrapper around express
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.1",
    "@swc/cli": "^0.6.0",
    "@swc/core": "^1.10.7",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.10.7",
    "@types/supertest": "^6.0.2",
    "jest": "^29.7.0",
    "prettier": "^3.4.2",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2", // runner (decorator)
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.3"
  }
}
```

# Architecture & Module

## NestJS Philosophy

- https://docs.nestjs.com/#philosophy

> Nest provides **an out-of-the-box application architecture** which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular.

## NestJS Module

- https://docs.nestjs.com/modules

> Every Nest application has at least one module, the **root module**, which serves as the starting point for Nest to build the **application graph**. This graph is an internal structure that Nest uses to resolve relationships and dependencies between modules and providers. While small applications might only have a root module, this is generally not the case. Modules are **highly recommended** as an effective way to organize your components. For most applications, you'll likely have multiple modules, each encapsulating a closely related set of **capabilities**.
> The `@Module()` decorator takes a single object with properties that describe the module:

![arch](/note/backend/nest-concise-aj/code/part01/section02-arch-module/express-app/arch.svg)

![arch](/note/backend/nest-concise-aj/code/part01/section02-arch-module/nest-app/arch.svg)

# DI & IoC

## Why not Instantiate

```ts
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  // Who provides: TS ❌, NodeJS ❌, NestJS Module ✅
  // Use Dependency Injection to inject AppService instance
  // instead of creating a new instance manually
  constructor(private readonly appService: AppService) {} // 2️⃣ sugar from NestJS

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

```ts
import { Injectable } from "@nestjs/common";

@Injectable() // 1️⃣ declares the class as provider
export class AppService {
  getHello(): string {
    return "Hello NestJS!";
  }
}
```

```ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService], // 3️⃣ register from app module
})
export class AppModule {}
```

## Providers

- https://docs.nestjs.com/providers

> **Providers** are a core concept in Nest. Many of the basic Nest **classes**, such as **services, repositories, factories, and helpers**, can be treated as providers. The key idea behind a provider is that it can be **injected** as a dependency, allowing objects to form various relationships with each other. The responsibility of "wiring up" these objects is largely handled by the Nest runtime system.

> The `CatsService` is **injected** through the class constructor. Notice the use of the `private` keyword. This shorthand allows us to both declare and initialize the `catsService` member in the same line, streamlining the process.

## Dependency Injection

- https://docs.nestjs.com/providers#dependency-injection
- https://docs.nestjs.com/fundamentals/custom-providers

> Dependency injection is an [inversion of control (IoC)](https://en.wikipedia.org/wiki/Inversion_of_control) technique wherein you delegate instantiation of dependencies to the IoC container (in our case, the NestJS runtime system), instead of doing it in your own code imperatively. Let's examine what's happening in this example from the [Providers chapter](https://docs.nestjs.com/providers).
> First, we define a provider. The `@Injectable()` decorator marks the `CatsService` class as a provider.

> What exactly is happening under the covers to make this work? There are three key steps in the process:
>
> 1. In `cats.service.ts`, the `@Injectable()` decorator declares the `CatsService` class as a class that can be managed by the Nest IoC container.
> 2. In `cats.controller.ts`, `CatsController` declares a dependency on the `CatsService` token with constructor injection.
> 3. In `app.module.ts`, we associate the token `CatsService` with the class `CatsService` from the `cats.service.ts` file. We'll [see below](https://docs.nestjs.com/fundamentals/custom-providers#standard-providers) exactly how this association (also called *registration*) occurs.

## IoC

- [inversion of control (IoC)](https://en.wikipedia.org/wiki/Inversion_of_control) 
- What does IoC control? And what exactly is inverted?

![ioc](/_lib/excalidraw/ioc.svg)

## Build JS

```js
let AppController = class AppController {
  constructor(appService) {
    this.appService = appService;
  }
  getHello() {
    return this.appService.getHello();
  }
};
```

# Controller & Service

## Cli

- https://docs.nestjs.com/cli/usages#nest-generate

```shell
nest g co todos --no-spec
nest g s todos --no-spec

nest g mo todos  # ✅
```

## Controller

- https://docs.nestjs.com/controllers#routing

> This method will return a 200 status code along with the associated response, which in this case is just a string. Why does this happen? To explain, we first need to introduce the concept that Nest uses two **different** options for manipulating responses:
>
> Standard (recommended)
> Using this built-in method, when a request handler returns a JavaScript object or array, it will **automatically** be serialized to JSON. When it returns a JavaScript primitive type (e.g., `string`, `number`, `boolean`), however, Nest will send just the value without attempting to serialize it. This makes response handling simple: just return the value, and Nest takes care of the rest.  
> Furthermore, the response's **status code** is always 200 by default, except for POST requests which use 201. We can easily change this behavior by adding the `@HttpCode(...)` decorator at a handler-level (see [Status codes](https://docs.nestjs.com/controllers#status-code)).
>
> Library-specific
> We can use the library-specific (e.g., Express) [response object](https://expressjs.com/en/api.html#res), which can be injected using the `@Res()` decorator in the method handler signature (e.g., `findAll(@Res() response)`). With this approach, you have the ability to use the native response handling methods exposed by that object. For example, with Express, you can construct responses using code like `response.status(200).send()`.

## Passthrough

> **Warning**
> Nest detects when the handler is using either `@Res()` or `@Next()`, indicating you have chosen the library-specific option. If both approaches are used at the same time, the Standard approach is **automatically disabled** for this single route and will no longer work as expected. To use both approaches at the same time (for example, by injecting the response object to only set cookies/headers but still leave the rest to the framework), you must set the `passthrough` option to `true` in the `@Res({ passthrough: true })` decorator.

## Req

- https://docs.nestjs.com/controllers#route-parameters
- https://docs.nestjs.com/controllers#request-object

```ts
  // @Get()
  // findOne(@Req() req: Request) {
  //   const { id } = req.params;
  // }

  // @Get(':id')
  // findOne(@Param() param: { id: string }) {
  //   const { id } = param;
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }
```

## Res

- https://docs.nestjs.com/controllers#status-code

```ts
  // @Delete(':id')
  // remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
  //   const todo = this.todosService.deleteTodo(+id);
  //   if (!todo)
  //     return res
  //       .status(HttpStatus.NOT_FOUND)
  //       .json({ message: 'Todo not found' });
  //   return { message: 'Todo deleted' }; // Because @Res, if there is no passthrough, the request will never get a reply.
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const todo = this.todosService.deleteTodo(+id);
    if (!todo) throw new NotFoundException({ message: 'Todo not found' });
    return todo;
  }
```

## Module

- https://docs.nestjs.com/modules

>  `providers`: the providers that will be instantiated by the Nest injector and that may be shared at least across this module
>  `controllers`: the set of controllers defined in this module which have to be instantiated
>  `imports`: the list of imported modules that export the providers which are required in this module
>  `exports`: the subset of `providers` that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (`provide` value)

# DTO & Pipe

```ts

```

# Resource

```shell

```
