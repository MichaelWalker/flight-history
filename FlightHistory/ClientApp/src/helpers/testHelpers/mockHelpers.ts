import * as globals from "../globals";
import { AuthClient } from "../../api/authClient";
import { getAccessToken } from "../tokenHelper";
import { stubToken } from "../../models/token.testdata";
import { quickReject, quickResolve } from "./asyncTestHelpers";

export function mockUseSampleData(useSampleData: boolean) {
    jest.spyOn(globals, "useSampleData").mockReturnValue(useSampleData);
}

export function mockUseConsoleLogging(useConsoleLogging: boolean) {
    jest.spyOn(globals, "useConsoleLogging").mockReturnValue(useConsoleLogging);
}

export function mockSuccessfulRefreshToken() {
    jest.spyOn(AuthClient, "refreshToken").mockImplementation(() => {
        return quickResolve(() => {
            getAccessToken().set(stubToken.token);
        });
    });
}

export function mockUnsuccessfulRefreshToken() {
    jest.spyOn(AuthClient, "refreshToken").mockImplementation(() => {
        return quickReject(() => {
            getAccessToken().set(null);
        });
    });
}
