import { enableSampleData } from "../helpers/globals";

export async function fetch(url: string, options: RequestInit): Promise<Response> {
    if (enableSampleData()) {
        const { stubFetch } = await import("./stub/stubApiResponse");
        return stubFetch(url, options);
    }

    return fetch(url, options);
}
