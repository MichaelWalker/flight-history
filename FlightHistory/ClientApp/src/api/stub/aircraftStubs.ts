import type { StubApiResponse } from "./stubApiResponse";
import { stubItemList } from "./stubApiResponse";
import { toURL } from "../apiHelpers";
import { stubAircraftList } from "../../models/aircraft.testdata";

export const AircraftStubs: StubApiResponse[] = [
    {
        url: "/api/aircraft",
        method: "GET",
        getResponseBody: (urlString: string): Response => {
            const url = toURL(urlString);
            const page = stubItemList(url, stubAircraftList, ["registration", "model"]);
            return new Response(JSON.stringify(page));
        },
    },
];
