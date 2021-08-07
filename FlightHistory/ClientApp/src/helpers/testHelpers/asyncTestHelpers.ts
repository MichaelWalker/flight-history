import { act } from "@testing-library/react-hooks";

export async function runActionAndWaitForAsyncActionsToComplete(
    action: () => Promise<unknown> | void,
): Promise<void> {
    await act(async () => {
        await action();
    });
}

export function quickResolve<T>(callback: () => T): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(callback());
        }, 0);
    });
}

export function quickReject<T>(callback: () => T): Promise<T> {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(callback());
        }, 0);
    });
}

export class WrappedPromise<T> {
    private readonly promise: Promise<T>;
    private resolved: boolean = false;
    private result: T | undefined;

    constructor(promise: Promise<T>) {
        this.promise = promise;

        promise.then((result) => {
            this.resolved = true;
            this.result = result;
        });
    }

    isResolved(): boolean {
        return this.resolved;
    }
}
