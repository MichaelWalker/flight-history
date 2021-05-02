// Sets the proportion of calls to the fake API that will be simulated to fail.
// 0 => no calls will ever fail
// 1 => all calls will always fail
import {AuthStubs} from "./authStubs";
import {accessToken} from "../../helpers/tokenHelper";

const FAILURE_RATE = 0;

// The fake API can add delays to all requests. This setting represents the delay in milliseconds.
let RESPONSE_TIME = 2000;

export interface StubApiResponse {
    method: 'GET' | 'POST' | 'DELETE';
    url: string;
    getResponseBody: (requestBody: string) => Response;
    failureRateOverride?: number;
    allowUnauthorised?: boolean;
}

const stubResponses: StubApiResponse[] = [
    ...AuthStubs,
];

function getMockResponse(url: string, options: RequestInit): Response {
    const stubResponse = stubResponses.find(stub => stub.url === url && stub.method === options.method);
    
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
    
    return stubResponse.getResponseBody(options.body as string);
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
