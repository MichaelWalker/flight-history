import { act } from "@testing-library/react-hooks";

export async function runActionAndWaitForAsyncActionsToComplete(
    action: () => Promise<unknown> | void,
): Promise<void> {
    await act(async () => {
        await action();
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
