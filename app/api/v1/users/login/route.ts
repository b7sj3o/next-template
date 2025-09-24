import bcrypt from "bcrypt";
import { prisma } from "@/db/client";
import { NextRequest } from "next/server";
import { setUserCookie } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";
import { LoginSchema } from "@/schemas/user";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        
        const result = LoginSchema.safeParse({ username, password });
        if (!result.success) {
            console.log(result.error);
            const message = JSON.parse(result.error.message)[0]?.message || "Помилка валідації даних";
            return failure(message, 400);
        }

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return failure("Користувача з таким username не знайдено.", 401);
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return failure("Невірний пароль.", 401);
        }

        await setUserCookie(user.id);

        return success("Ви успішно увійшли в акаунт.", 200);
    } catch (error) {
        console.error(error);
        return failure("Помилка при вході в акаунт.", 500);
    }
}
