import { StubApiResponse, stubItemList } from "./stubApiResponse";
import { toURL } from "../apiHelpers";
import { Airport } from "../../models/airport";

export const airports: Airport[] = [
    { id: 1, name: "London Heathrow", code: "LHR" },
    { id: 2, name: "London Gatwick", code: "LGW" },
];

export const AirportStubs: StubApiResponse[] = [
    {
        url: "/api/airports",
        method: "GET",
        getResponseBody: (urlString) => {
            const url = toURL(urlString);
            const page = stubItemList(url, airports);
            return new Response(JSON.stringify(page));
        },
    },
];
