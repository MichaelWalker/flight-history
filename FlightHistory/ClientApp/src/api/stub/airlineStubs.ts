import type { StubApiResponse} from "./stubApiResponse";
import { stubItemList } from "./stubApiResponse";
import { toURL } from "../apiHelpers";
import type { Airline } from "../../models/airline";

export const airlines: Airline[] = [
    { id: 1, name: "British Airways" },
    { id: 2, name: "EasyJet" },
];

export const AirlineStubs: StubApiResponse[] = [
    {
        url: "/api/airlines",
        method: "GET",
        getResponseBody: (urlString: string): Response => {
            const url = toURL(urlString);
            const page = stubItemList(url, airlines);
            return new Response(JSON.stringify(page));
        },
    },
];
