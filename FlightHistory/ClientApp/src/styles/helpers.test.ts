import { rgba } from "./helpers";

describe("helpers", () => {
    describe("rgba", () => {
        it.each`
            hex          | expected
            ${"#000000"} | ${"rgba(0, 0, 0, 0.5)"}
            ${"#FFFFFF"} | ${"rgba(255, 255, 255, 0.5)"}
            ${"#ffffff"} | ${"rgba(255, 255, 255, 0.5)"}
        `("should convert hex strings to rgba values", ({ hex, expected }) => {
            expect(rgba(hex, 0.5)).toBe(expected);
        });
    });
});
