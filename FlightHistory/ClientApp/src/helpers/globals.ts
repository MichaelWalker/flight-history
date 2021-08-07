let idCounter = 0;

export function getNextIdCounter(): number {
    idCounter++;
    return idCounter;
}

export function enableSampleData(): boolean {
    return USE_SAMPLE_DATA;
}

export function enableConsoleLogging(): boolean {
    return USE_CONSOLE_LOGGING;
}
