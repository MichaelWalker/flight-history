import type { StubApiResponse} from "./stubApiResponse";
import { stubItemList } from "./stubApiResponse";
import { toURL } from "../apiHelpers";
import type { Aircraft } from "../../models/aircraft";

export const aircraft: Aircraft[] = [
    { id: 1, registration: "VP-BWX", model: "767" },
    { id: 2, registration: "VP-BDN", model: "A319" },
];

export const AircraftStubs: StubApiResponse[] = [
    {
        url: "/api/aircraft",
        method: "GET",
        getResponseBody: (urlString: string): Response => {
            const url = toURL(urlString);
            const page = stubItemList(url, aircraft);
            return new Response(JSON.stringify(page));
        },
    },
];
