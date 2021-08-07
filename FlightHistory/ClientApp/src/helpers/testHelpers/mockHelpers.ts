import * as globals from "../globals";

export function mockUseSampleData(useSampleData: boolean) {
    jest.spyOn(globals, "useSampleData").mockReturnValue(useSampleData);
}

export function mockUseConsoleLogging(useConsoleLogging: boolean) {
    jest.spyOn(globals, "useConsoleLogging").mockReturnValue(useConsoleLogging);
}
