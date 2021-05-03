import {Airport} from "./airport";
import {Aircraft} from "./aircraft";
import {Airline} from "./airline";

export interface Flight {
    id: number;
    source: Airport;
    destination: Airport;
    aircraft: Aircraft;
    airline: Airline;
    date: string;
}