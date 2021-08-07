import { renderHook } from "@testing-library/react-hooks";
import { useFetchData } from "./useFetchData";
import { runActionAndWaitForAsyncActionsToComplete } from "../helpers/testHelper";

describe("useFetchData", () => {
    it("starts in the loading state even before loading is triggered", () => {
        const neverReturningPromise = new Promise(() => {
            return;
        });
        const { result } = renderHook(() => useFetchData(() => neverReturningPromise));
        const [, state] = result.current;
        expect(state.status).toBe("LOADING");
    });

    it("stays in the loading state if promise is unresolved", async () => {
        const neverReturningPromise = new Promise(() => {
            return;
        });
        const { result } = renderHook(() => useFetchData(() => neverReturningPromise));
        const [startResultLoading] = result.current;
        await runActionAndWaitForAsyncActionsToComplete(() => {
            startResultLoading();
        });
        const [, state] = result.current;
        expect(state.status).toBe("LOADING");
    });

    it("moves to the success state if promise is already resolved", async () => {
        const resolvedPromise = Promise.resolve();
        const { result } = renderHook(() => useFetchData(() => resolvedPromise));
        const [startResultLoading] = result.current;
        await runActionAndWaitForAsyncActionsToComplete(() => {
            startResultLoading();
        });
        const [, state] = result.current;
        expect(state.status).toBe("SUCCESS");
    });

    it("moves to the error state if promise is already rejected", async () => {
        const rejectedPromise = Promise.reject();
        const { result } = renderHook(() => useFetchData(() => rejectedPromise));
        const [startResultLoading] = result.current;
        await runActionAndWaitForAsyncActionsToComplete(() => {
            startResultLoading();
        });
        const [, state] = result.current;
        expect(state.status).toBe("FAILED");
    });

    it("transitions to the success state if promise rejects later", async () => {
        let resolvePromise: (value: unknown) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        const { result } = renderHook(() => useFetchData(() => promise));
        const [startResultLoading] = result.current;
        await runActionAndWaitForAsyncActionsToComplete(() => {
            startResultLoading();
        });
        const state1 = result.current[1];
        expect(state1.status).toBe("LOADING");
        await runActionAndWaitForAsyncActionsToComplete(() => {
            resolvePromise(undefined);
        });
        const state2 = result.current[1];
        expect(state2.status).toBe("SUCCESS");
    });

    it("ignores the result of the first promise if a second promise comes in", async () => {
        let resolvePromise1: (value: unknown) => void;
        let resolvePromise2: (value: unknown) => void;
        const promise1 = new Promise((resolve) => {
            resolvePromise1 = resolve;
        });
        const promise2 = new Promise((resolve) => {
            resolvePromise2 = resolve;
        });
        let currPromise = promise1;
        const { result } = renderHook(() => useFetchData(() => currPromise));
        const [startResultLoading] = result.current;
        await runActionAndWaitForAsyncActionsToComplete(() => {
            startResultLoading();
        });
        const state1 = result.current[1];
        expect(state1.status).toBe("LOADING");
        currPromise = promise2;
        // Start promise 2. At this point, promise 2 has replaced promise 1 and we don't care about the result of promise 1
        await runActionAndWaitForAsyncActionsToComplete(() => {
            startResultLoading();
        });
        // Promise 1 now completes, but we shouldn't care
        await runActionAndWaitForAsyncActionsToComplete(() => {
            resolvePromise1(undefined);
        });
        // We now care about the result of the newest promise (promise 2), so we're still in the loading state:
        const state2 = result.current[1];
        expect(state2.status).toBe("LOADING");
        await runActionAndWaitForAsyncActionsToComplete(() => {
            resolvePromise2(undefined);
        });
        // And now promise 2 has completed, so we should be loaded successfully:
        const state3 = result.current[1];
        expect(state3.status).toBe("SUCCESS");
    });
});
