export function isNotNullOrEmpty<T>(item: T | null): item is T {
    if (item === null) {
        return false;
    }

    return !(typeof item === "string" && item.trim() === "");
}
