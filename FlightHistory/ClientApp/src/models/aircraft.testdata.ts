import type { Aircraft } from "./aircraft";

export const stubAircraft: Aircraft = {
    id: 1,
    registration: "VP-BWX",
    model: "767",
};

export const stubAircraftList: Aircraft[] = [
    stubAircraft,
    { id: 2, registration: "VP-BDN", model: "A319" },
    { id: 3, registration: "D-ABYS", model: "747" },
    { id: 4, registration: "LX-LGG", model: "A320" },
];
