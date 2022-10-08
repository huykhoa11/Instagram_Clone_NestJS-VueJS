import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Task } from "../entities/task.entity";

export const GetTask = createParamDecorator((_data, ctx: ExecutionContext):Task => {
    const req = ctx.switchToHttp().getRequest();
    return req.task;
}) 