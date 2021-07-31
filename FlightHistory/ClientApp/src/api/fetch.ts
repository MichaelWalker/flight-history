import { useSampleData } from "../helpers/globals";

export async function fetch<T>(url: string, options: RequestInit): Promise<Response> {
    if (useSampleData()) {
        const { stubFetch } = await import("./stub/stubApiResponse");
        return stubFetch(url, options);
    }

    return fetch(url, options);
}
