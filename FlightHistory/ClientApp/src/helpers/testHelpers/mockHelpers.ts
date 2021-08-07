import * as globals from "../globals";
import { AuthClient } from "../../api/authClient";
import { getAccessToken } from "../tokenHelper";
import { stubToken } from "../../models/token.testdata";
import { quickReject, quickResolve } from "./asyncTestHelpers";

export function mockUseSampleData(useSampleData: boolean): void {
    jest.spyOn(globals, "enableSampleData").mockReturnValue(useSampleData);
}

export function mockUseConsoleLogging(useConsoleLogging: boolean): void {
    jest.spyOn(globals, "enableConsoleLogging").mockReturnValue(useConsoleLogging);
}

export function mockSuccessfulRefreshToken(): void {
    jest.spyOn(AuthClient, "refreshToken").mockImplementation(async () => {
        return quickResolve(() => {
            getAccessToken().set(stubToken.token);
        });
    });
}

export function mockUnsuccessfulRefreshToken(): void {
    jest.spyOn(AuthClient, "refreshToken").mockImplementation(async () => {
        return quickReject(() => {
            getAccessToken().set(null);
        });
    });
}
