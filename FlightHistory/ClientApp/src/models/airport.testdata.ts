import { Airport } from "./airport";

export const stubAirport: Airport = {
    id: 1,
    name: "London Heathrow",
    code: "LHR",
};

export const stubAirport2: Airport = {
    id: 2,
    name: "London Gatwick",
    code: "LGW",
};

export const stubAirportList: Airport[] = [
    stubAirport,
    stubAirport2,
    { id: 3, name: "Bristol", code: "BST" },
    { id: 4, name: "Liverpool", code: "LVP" },
];
