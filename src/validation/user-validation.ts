import {ZodType, z} from "zod";
import {CreateUserRequest} from "../model/user-model";

export class UserValidation {
    static readonly REGISTER: ZodType<CreateUserRequest> = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100),
    });
}