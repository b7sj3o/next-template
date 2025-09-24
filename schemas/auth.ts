import { z } from "zod";


export const LoginSchema = z.object({
    username: z.string("Неправильний формат поля"),
    password: z.string("Неправильний формат поля"),
})

export type LoginType = z.infer<typeof LoginSchema>;
