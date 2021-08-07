import type { StubApiResponse } from "./stubApiResponse";
import { stubItemList } from "./stubApiResponse";
import { toURL } from "../apiHelpers";
import { stubAirlineList } from "../../models/airline.testdata";

export const AirlineStubs: StubApiResponse[] = [
    {
        url: "/api/airlines",
        method: "GET",
        getResponseBody: (urlString: string): Response => {
            const url = toURL(urlString);
            const page = stubItemList(url, stubAirlineList);
            return new Response(JSON.stringify(page));
        },
    },
];
