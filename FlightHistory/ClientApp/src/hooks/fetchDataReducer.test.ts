import { fetchDataReducer } from "./fetchDataReducer";

describe("fetchDataReducer", () => {
    const previousState = {
        loading: { status: "LOADING" },
        reloading: { status: "RELOADING", data: { name: "Mike" } },
        success: { status: "SUCCESS", data: { name: "Mike" } },
        failed: { status: "FAILED", error: { name: "Error", message: "Oh No!" } },
    };

    const message = {
        load: { type: "LOAD" },
        success: { type: "SUCCESS", result: { name: "New Name" } },
        failure: {
            type: "FAILURE",
            error: { name: "API Error", message: "Not Found", status: 401 },
        },
    };

    const nextState = {
        loading: { status: "LOADING" },
        reloading: { status: "RELOADING", data: { name: "Mike" } },
        success: { status: "SUCCESS", data: { name: "New Name" } },
        failed: {
            status: "FAILED",
            error: { name: "API Error", message: "Not Found", status: 401 },
        },
    };

    it.each`
        previousState              | message            | expectedNextState
        ${previousState.loading}   | ${message.load}    | ${nextState.loading}
        ${previousState.loading}   | ${message.success} | ${nextState.success}
        ${previousState.loading}   | ${message.failure} | ${nextState.failed}
        ${previousState.reloading} | ${message.load}    | ${nextState.reloading}
        ${previousState.reloading} | ${message.success} | ${nextState.success}
        ${previousState.reloading} | ${message.failure} | ${nextState.failed}
        ${previousState.success}   | ${message.load}    | ${nextState.reloading}
        ${previousState.success}   | ${message.success} | ${nextState.success}
        ${previousState.success}   | ${message.failure} | ${nextState.failed}
        ${previousState.failed}    | ${message.load}    | ${nextState.loading}
        ${previousState.failed}    | ${message.success} | ${nextState.success}
        ${previousState.failed}    | ${message.failure} | ${nextState.failed}
    `("should move to correct next state", ({ previousState, message, expectedNextState }) => {
        expect(fetchDataReducer(previousState, message)).toEqual(expectedNextState);
    });
});
