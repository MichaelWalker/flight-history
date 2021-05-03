import {StubApiResponse, stubItemList} from "./stubApiResponse";
import {toURL} from "../apiHelpers";
import {Flight} from "../../models/flight";
import {aircraft} from "./aircraftStubs";
import {airlines} from "./airlineStubs";
import {airports} from "./airportStubs";

function random<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

const flights: Flight[] = [
    { id: 1, aircraft: random(aircraft), airline: random(airlines), source: random(airports), destination: random(airports), date: '2015-12-17' },
    { id: 2, aircraft: random(aircraft), airline: random(airlines), source: random(airports), destination: random(airports), date: '2016-12-17' },
    { id: 3, aircraft: random(aircraft), airline: random(airlines), source: random(airports), destination: random(airports), date: '2017-12-17' },
    { id: 4, aircraft: random(aircraft), airline: random(airlines), source: random(airports), destination: random(airports), date: '2018-12-17' },
];

export const FlightStubs: StubApiResponse[] = [
    {
        url: '/api/flights',
        method: 'GET',
        getResponseBody: (urlString) => {
            const url = toURL(urlString);
            const page = stubItemList(url, flights);
            return new Response(JSON.stringify(page));
        },
    },
];
