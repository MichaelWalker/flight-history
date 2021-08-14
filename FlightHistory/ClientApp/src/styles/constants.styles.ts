const unitSize = 0.25;

export function len(units: number): string {
    return `${units * unitSize}rem`;
}

export const SPACING = {
    SMALL: len(4),
    MEDIUM: len(8),
    LARGE: len(16),
} as const;
