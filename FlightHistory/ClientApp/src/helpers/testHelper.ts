import type { User } from "../models/user";
import { act } from "@testing-library/react-hooks";

export function generateTestAccessToken(user: User, expiresInMinutes?: number): string {
    const header = btoa(JSON.stringify({ typ: "JWT", alg: "HS512" }));
    const payload = btoa(
        JSON.stringify({
            expiryTimestamp: expiresInMinutes
                ? new Date().getTime() + expiresInMinutes * 60000
                : undefined,
            user: user,
        }),
    );
    const signature = btoa("secret");

    return `${header}.${payload}.${signature}`;
}

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
