import { useConsoleLogging } from "./globals";

function info(message: string) {
    if (useConsoleLogging()) {
        console.log(message);
    }
}

export const Logger = {
    info,
};
