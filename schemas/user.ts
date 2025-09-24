import { z } from "zod";


export const UserSchema = z.object({
    username: z.string("Неправильний формат поля")
        .min(4, "Ім'я користувача не може бути порожнім"),

    email: z.email("Неправильний формат електронної пошти"),

    password: z.string("Неправильний формат поля")
        .min(8, "Пароль повинен містити принаймні 8 символів"),
})


export const UpdateUserSchema = z.object({
    username: z.string("Неправильний формат поля")
        .min(4, "Ім'я користувача не може бути порожнім")
        .nullable(),
    
    email: z.email("Неправильний формат електронної пошти")
        .nullable(),

    password: z.string("Неправильний формат поля")
        .min(8, "Пароль повинен містити принаймні 8 символів")
})

export type UserType = z.infer<typeof UserSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;