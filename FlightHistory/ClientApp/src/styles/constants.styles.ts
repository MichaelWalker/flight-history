const unitSize = 0.25;

export const DEFAULT_TRANSITION_TIME = 200;

export function len(units: number): string {
    return `${units * unitSize}rem`;
}

export const SPACING = {
    SMALL: len(4),
    MEDIUM: len(8),
    LARGE: len(16),
} as const;

export const TRANSITIONS = {
    DEFAULT: `${DEFAULT_TRANSITION_TIME}ms`,
};
