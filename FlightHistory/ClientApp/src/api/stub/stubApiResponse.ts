// Sets the proportion of calls to the fake API that will be simulated to fail.
// 0 => no calls will ever fail
// 1 => all calls will always fail
import {AuthStubs} from "./authStubs";
import {accessToken} from "../../helpers/tokenHelper";
import {Item, ItemListResponse, toURL} from "../apiHelpers";
import {AirlineStubs} from "./airlineStubs";
import {AircraftStubs} from "./aircraftStubs";
import {AirportStubs} from "./airportStubs";
import {FlightStubs} from "./flightStubs";

const FAILURE_RATE = 0;

// The fake API can add delays to all requests. This setting represents the delay in milliseconds.
let RESPONSE_TIME = 2000;

export interface StubApiResponse {
    method: 'GET' | 'POST' | 'DELETE';
    url: string;
    getResponseBody: (url: string, requestBody: string) => Response;
    failureRateOverride?: number;
    allowUnauthorised?: boolean;
}

const stubResponses: StubApiResponse[] = [
    ...AuthStubs,
    ...AircraftStubs,
    ...AirlineStubs,
    ...AirportStubs,
    ...FlightStubs,
];

export function stubItemList<T extends Item>(url: URL, items: T[]): ItemListResponse<T> {
    const pageString = url.searchParams.get('page');
    const pageSizeString = url.searchParams.get('pageSize');
    const page = pageString ? parseInt(pageString) : 1;
    const pageSize = pageSizeString ? parseInt(pageSizeString) : 20;
    
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return {
        items: items.slice(start, end),
        count: items.length,
    }
}

function getMockResponse(urlString: string, options: RequestInit): Response {
    const url = toURL(urlString);
    const stubResponse = stubResponses.find(stub => 
        stub.url === url.pathname && 
        stub.method === options.method
    );
    
    if (!stubResponse) {
        return {
            ...Response.error(),
            status: 404,
            statusText: 'Not Found',
        };
    }

    if(!stubResponse.allowUnauthorised && !accessToken) {
        return {
            ...Response.error(),
            status: 401,
            statusText: 'Unauthorised',
        }
    }
    
    const failureRate = stubResponse.failureRateOverride ?? FAILURE_RATE;
    if (Math.random() < failureRate) {
        return {
            ...Response.error(),
            status: 500,
            statusText: 'Something went wrong',
        };
    }
    
    return stubResponse.getResponseBody(urlString, options.body as string);
}

export function stubFetch<T>(url: string, options: RequestInit): Promise<Response> {
    console.info(`${options.method} request to ${url}`);
    const response = getMockResponse(url, options);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(response);
        }, RESPONSE_TIME); 
    });
}
