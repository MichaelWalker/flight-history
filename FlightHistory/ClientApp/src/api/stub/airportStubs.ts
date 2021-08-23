import type { StubApiResponse } from "./stubApiResponse";
import { stubItemList } from "./stubApiResponse";
import { toURL } from "../apiHelpers";
import { stubAirportList } from "../../models/airport.testdata";

export const AirportStubs: StubApiResponse[] = [
    {
        url: "/api/airports",
        method: "GET",
        getResponseBody: (urlString: string): Response => {
            const url = toURL(urlString);
            const page = stubItemList(url, stubAirportList, ["name", "code"]);
            return new Response(JSON.stringify(page));
        },
    },
];
