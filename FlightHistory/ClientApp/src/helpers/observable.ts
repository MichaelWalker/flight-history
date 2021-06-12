export class Observable<TValue> {
    value: TValue;
    observers: ((newValue: TValue) => void)[] = [];

    static of<T>(initialValue: T): Observable<T> {
        return new Observable<T>(initialValue);
    }

    private constructor(initialValue: TValue) {
        this.value = initialValue;
    }

    subscribe(callback: (newValue: TValue) => void): void {
        this.observers.push(callback);
    }

    unsubscribe(callback: (newValue: TValue) => void): void {
        this.observers = this.observers.filter((item) => item !== callback);
    }

    set(newValue: TValue): void {
        this.value = newValue;
        this.observers.forEach((callback) => callback(newValue));
    }

    get(): TValue {
        return this.value;
    }
}
