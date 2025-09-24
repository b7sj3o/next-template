import { refreshTokenIfNeeded, verifyJWT } from "@/lib/auth";
import { NextRequest } from "next/server";
import { success, failure } from "@/lib/api-response";
import { prisma } from "@/db/client";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;
        const payload = token ? await verifyJWT(token) : null;

        if (!payload) return failure("Ви неавторизовані", 401);

        await refreshTokenIfNeeded(token!)
        
        const user = await prisma.user.findUnique({
            where: { id: payload.userId as number },
        });

        if (!user) return failure("Користувача не знайдено", 404);
        // if (!user.isAdmin) return failure("Недостатньо прав доступу", 403);

        return success({message: "Ви авторизовані"}, 200);
    } catch (e) {
        console.log(e)
        return failure("Помилка при отриманні даних", 500);
    }
}
