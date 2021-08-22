interface RBG {
    red: number;
    green: number;
    blue: number;
}

export function rgba(hexColor: string, opacity: number): string {
    const { red, green, blue } = toRGB(hexColor);
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function toRGB(hexColor: string): RBG {
    const hex = hexColor.replace("#", "");

    return {
        red: parseHex(hex.substring(0, 2)),
        green: parseHex(hex.substring(2, 4)),
        blue: parseHex(hex.substring(4, 6)),
    };
}

function parseHex(hex: string): number {
    return parseInt(`0x${hex}`, 16);
}
