let idCounter = 0;

export function getNextIdCounter() {
    idCounter++;
    return idCounter;
}

export function useSampleData() {
    return USE_SAMPLE_DATA;
}
