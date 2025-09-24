
export function validateInt(rawId: string): number | null {
    const id = Number(rawId)

    if (!Number.isInteger(id) || id <= 0) {
        return null;
    }

    return id;
}