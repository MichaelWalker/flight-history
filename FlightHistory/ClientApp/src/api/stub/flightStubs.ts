import { StubApiResponse, stubItemList } from "./stubApiResponse";
import { toURL } from "../apiHelpers";
import { Flight } from "../../models/flight";
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
    const random = addDays(today, -1 * Math.floor(Math.random() * 3000));
    return format(random, "yyyy-MM-dd");
}

function getFlights(): Flight[] {
    const flights: Flight[] = [];

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

    return flights;
}

export const FlightStubs: StubApiResponse[] = [
    {
        url: "/api/flights",
        method: "GET",
        getResponseBody: (urlString) => {
            const url = toURL(urlString);
            const page = stubItemList(url, getFlights());
            return new Response(JSON.stringify(page));
        },
    },
];
