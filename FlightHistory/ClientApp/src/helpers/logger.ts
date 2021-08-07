import { enableConsoleLogging } from "./globals";

function info(message: string): void {
    if (enableConsoleLogging()) {
        /* eslint-disable-next-line no-console */
        console.log(message);
    }
}

export const Logger = {
    info,
};
