import type { StubApiResponse } from "./stubApiResponse";
import { stubItemList } from "./stubApiResponse";
import { toURL } from "../apiHelpers";
import type { Flight } from "../../models/flight";
import { aircraft } from "./aircraftStubs";
import { airlines } from "./airlineStubs";
import { airports } from "./airportStubs";
import addDays from "date-fns/addDays";
import { format } from "date-fns";

function random<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

function randomDate(): string {
    const today = new Date();
    const randomPastDate = addDays(today, -1 * Math.floor(Math.random() * 3000));
    return format(randomPastDate, "yyyy-MM-dd");
}

let flights: Flight[] = [];

function getFlights(): Flight[] {
    if (flights.length === 0) {
        for (let counter = 0; counter < 92; counter++) {
            flights.push({
                id: counter,
                aircraft: random(aircraft),
                airline: random(airlines),
                source: random(airports),
                destination: random(airports),
                date: randomDate(),
            });
        }
    }

    return flights;
}

export const FlightStubs: StubApiResponse[] = [
    {
        url: "/api/flights",
        method: "GET",
        getResponseBody: (urlString: string): Response => {
            const url = toURL(urlString);
            const page = stubItemList(url, getFlights());
            return new Response(JSON.stringify(page));
        },
    },
];
