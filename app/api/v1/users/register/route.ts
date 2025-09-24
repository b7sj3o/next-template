import bcrypt from "bcrypt";
import { prisma } from "@/db/client";
import { NextRequest } from "next/server";
import { success, failure } from "@/lib/api-response";
import { UserSchema } from "@/schemas/user";
import { setUserCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();
        const result = UserSchema.safeParse({ username, email, password });
        if (!result.success) {
            const message = JSON.parse(result.error.message)[0]?.message || "Помилка валідації даних";
            return failure(message, 400);
        }

        const existingUser = await prisma.user.findUnique({ where: { username } });
        const existingUserEmail = await prisma.user.findUnique({ where: { email } });
        
        if (existingUser) return failure("Це ім'я користувача вже зайняте", 409);
        if (existingUserEmail) return failure("Ця електронна пошта вже зайнята", 409);

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({ data: { username, email, password: hashedPassword } });

        await setUserCookie(user.id);
    
        return success({ message: "Ви успішно зареєструвались" }, 201);
    } catch (e) {
        console.log(e)
        return failure("Помилка при реєстрації", 500);
    }
}
