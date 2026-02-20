/* eslint-disable */
export default async () => {
    const t = {
        ["./todos/entities/todo.entity"]: await import("./todos/entities/todo.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./todos/dto/create-todo.dto"), { "CreateTodoDto": { title: { required: true, type: () => String, minLength: 3 }, content: { required: true, type: () => String, maxLength: 100 }, isCompleted: { required: true, type: () => Boolean } } }], [import("./todos/dto/update-todo.dto"), { "UpdateTodoDto": {} }], [import("./todos/entities/todo.entity"), { "Todo": { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, content: { required: true, type: () => String }, isCompleted: { required: true, type: () => Boolean } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./todos/todos.controller"), { "TodosController": { "findAll": { type: [t["./todos/entities/todo.entity"].Todo] }, "findOne": { type: t["./todos/entities/todo.entity"].Todo }, "create": {}, "update": { type: Object }, "remove": { type: Object } } }]] } };
};