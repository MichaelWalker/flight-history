import type { Airport } from "./airport";
import type { Aircraft } from "./aircraft";
import type { Airline } from "./airline";

export interface Flight {
    id: number;
    source: Airport;
    destination: Airport;
    aircraft: Aircraft;
    airline: Airline;
    date: string;
}
