import { cookies } from "next/headers";
import { success, failure } from "@/lib/api-response";

export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");

        return success("Ви успішно вийшли з акаунту.", 200);
    } catch (e) {
        console.error("Users error:", e);
        return failure("Internal server error", 500);
    }
}
