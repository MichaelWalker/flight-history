import * as useIsMounted from "./useIsMounted";
import { renderHook } from "@testing-library/react-hooks";
import { useLatestOnlyAsyncCall } from "./useLatestOnlyAsyncCall";
import {
    runActionAndWaitForAsyncActionsToComplete,
    WrappedPromise,
} from "../helpers/testHelpers/asyncTestHelpers";

describe("useLatestOnlyAsyncCall", () => {
    const item = { name: "Mike" };

    function mockIsMounted(isMounted: boolean) {
        jest.spyOn(useIsMounted, "useIsMounted").mockImplementation(() => () => isMounted);
    }

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("when promise resolves", () => {
        it("is returned if it is the latest promise", async () => {
            mockIsMounted(true);

            const { result } = renderHook(() =>
                useLatestOnlyAsyncCall(async () => Promise.resolve(item)),
            );
            const startAsyncCall = result.current;

            expect(await startAsyncCall()).toBe(item);
        });

        it("is ignored if there is a more recent promise", async () => {
            mockIsMounted(true);
            let resolvePromise1: (value: unknown) => void = () => {
                /* Do nothing */
            };
            let resolvePromise2: (value: unknown) => void = () => {
                /* Do nothing */
            };

            const callback = jest
                .fn()
                .mockImplementationOnce(
                    async () =>
                        new Promise((resolve) => {
                            resolvePromise1 = resolve;
                        }),
                )
                .mockImplementationOnce(
                    async () =>
                        new Promise((resolve) => {
                            resolvePromise2 = resolve;
                        }),
                );

            const { result } = renderHook(() => useLatestOnlyAsyncCall(callback));
            const startAsyncCall = result.current;

            // start both promises
            const initialCall = new WrappedPromise(startAsyncCall());
            const secondCall = new WrappedPromise(startAsyncCall());

            // resolving the first promise shouldn't change anything.
            await runActionAndWaitForAsyncActionsToComplete(() => {
                resolvePromise1(undefined);
            });
            expect(initialCall.isResolved()).toBeFalsy();
            expect(secondCall.isResolved()).toBeFalsy();

            // resolving the second promise should resolve the call.
            await runActionAndWaitForAsyncActionsToComplete(() => {
                resolvePromise2(undefined);
            });
            expect(initialCall.isResolved()).toBeFalsy();
            expect(secondCall.isResolved()).toBeTruthy();
        });
    });

    describe("when promise rejects", () => {
        it("is thrown if it is the latest promise", async () => {
            mockIsMounted(true);

            const { result } = renderHook(() =>
                useLatestOnlyAsyncCall(async () => Promise.reject("Oh no")),
            );
            const startAsyncCall = result.current;

            await expect(startAsyncCall()).rejects.toBe("Oh no");
        });

        it("is ignored if there is a more recent promise", async () => {
            mockIsMounted(true);
            let rejectPromise1: (value: unknown) => void = () => {
                /* Do nothing */
            };
            let resolvePromise2: (value: unknown) => void = () => {
                /* Do nothing */
            };

            const callback = jest
                .fn()
                .mockImplementationOnce(
                    async () =>
                        new Promise((resolve, reject) => {
                            rejectPromise1 = reject;
                        }),
                )
                .mockImplementationOnce(
                    async () =>
                        new Promise((resolve) => {
                            resolvePromise2 = resolve;
                        }),
                );

            const { result } = renderHook(() => useLatestOnlyAsyncCall(callback));
            const startAsyncCall = result.current;

            // start both promises
            const initialCall = new WrappedPromise(startAsyncCall());
            const secondCall = new WrappedPromise(startAsyncCall());

            // rejecting the first promise shouldn't change anything.
            await runActionAndWaitForAsyncActionsToComplete(() => {
                rejectPromise1(undefined);
            });
            expect(initialCall.isResolved()).toBeFalsy();
            expect(secondCall.isResolved()).toBeFalsy();

            // resolving the second promise should resolve the call.
            await runActionAndWaitForAsyncActionsToComplete(() => {
                resolvePromise2(undefined);
            });
            expect(initialCall.isResolved()).toBeFalsy();
            expect(secondCall.isResolved()).toBeTruthy();
        });
    });
});
