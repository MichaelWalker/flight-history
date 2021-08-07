import { fetchDataReducer } from "./fetchDataReducer";

describe("fetchDataReducer", () => {
    const previousStates = {
        loading: { status: "LOADING" },
        reloading: { status: "RELOADING", data: { name: "Mike" } },
        success: { status: "SUCCESS", data: { name: "Mike" } },
        failed: { status: "FAILED", error: { name: "Error", message: "Oh No!" } },
    };

    const messages = {
        load: { type: "LOAD" },
        success: { type: "SUCCESS", result: { name: "New Name" } },
        failure: {
            type: "FAILURE",
            error: { name: "API Error", message: "Not Found", status: 401 },
        },
    };

    const nextStates = {
        loading: { status: "LOADING" },
        reloading: { status: "RELOADING", data: { name: "Mike" } },
        success: { status: "SUCCESS", data: { name: "New Name" } },
        failed: {
            status: "FAILED",
            error: { name: "API Error", message: "Not Found", status: 401 },
        },
    };

    it.each`
        previousState               | message             | expectedNextState
        ${previousStates.loading}   | ${messages.load}    | ${nextStates.loading}
        ${previousStates.loading}   | ${messages.success} | ${nextStates.success}
        ${previousStates.loading}   | ${messages.failure} | ${nextStates.failed}
        ${previousStates.reloading} | ${messages.load}    | ${nextStates.reloading}
        ${previousStates.reloading} | ${messages.success} | ${nextStates.success}
        ${previousStates.reloading} | ${messages.failure} | ${nextStates.failed}
        ${previousStates.success}   | ${messages.load}    | ${nextStates.reloading}
        ${previousStates.success}   | ${messages.success} | ${nextStates.success}
        ${previousStates.success}   | ${messages.failure} | ${nextStates.failed}
        ${previousStates.failed}    | ${messages.load}    | ${nextStates.loading}
        ${previousStates.failed}    | ${messages.success} | ${nextStates.success}
        ${previousStates.failed}    | ${messages.failure} | ${nextStates.failed}
    `("should move to correct next state", ({ previousState, message, expectedNextState }) => {
        expect(fetchDataReducer(previousState, message)).toEqual(expectedNextState);
    });
});
