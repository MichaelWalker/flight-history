import { enableConsoleLogging } from "./globals";

function info(message: any, ...optionalParams: any[]): void {
    if (enableConsoleLogging()) {
        /* eslint-disable-next-line no-console */
        console.log(message, optionalParams);
    }
}

export const Logger = {
    info,
};
