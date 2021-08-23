import type { StubApiResponse } from "./stubApiResponse";
import { stubItemList } from "./stubApiResponse";
import { toURL } from "../apiHelpers";
import { stubFlightList } from "../../models/flight.testdata";

export const FlightStubs: StubApiResponse[] = [
    {
        url: "/api/flights",
        method: "GET",
        getResponseBody: (urlString: string): Response => {
            const url = toURL(urlString);
            const page = stubItemList(url, stubFlightList, ["date"]);
            return new Response(JSON.stringify(page));
        },
    },
];
