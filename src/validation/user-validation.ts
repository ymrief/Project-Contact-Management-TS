import {ZodType, z} from "zod";
import {CreateUserRequest, LoginUserRequest, UpdateUserRequest} from "../model/user-model";

export class UserValidation {
    static readonly REGISTER: ZodType<CreateUserRequest> = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100),
    });

    static readonly LOGIN: ZodType<LoginUserRequest> = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    });

    static readonly UPDATE: ZodType<UpdateUserRequest> = z.object({
        password: z.string().min(1).max(100).optional(),
        name: z.string().min(1).max(100).optional(),
    });
}