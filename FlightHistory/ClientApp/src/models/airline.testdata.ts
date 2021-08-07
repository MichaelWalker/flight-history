import { Airline } from "./airline";

export const stubAirline: Airline = {
    id: 1,
    name: "British Airways",
};

export const stubAirline2: Airline = {
    id: 2,
    name: "EasyJet",
};

export const stubAirlineList: Airline[] = [
    stubAirline,
    { id: 2, name: "EasyJet" },
    { id: 3, name: "Virgin Atlantic" },
    { id: 4, name: "Flybe" },
];
