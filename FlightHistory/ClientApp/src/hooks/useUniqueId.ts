import { useState } from "react";
import { getNextIdCounter } from "../helpers/globals";

function generateUniqueId(prefix: string): string {
    return `${prefix}-${getNextIdCounter()}`;
}

export function useUniqueId(prefix: string): string {
    const [id] = useState(generateUniqueId(prefix));
    return id;
}
