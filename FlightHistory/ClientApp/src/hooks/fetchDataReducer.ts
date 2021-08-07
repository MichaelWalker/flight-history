import { FetchDataState } from "./useFetchData";

export type FetchDataMessage<TData> =
    | { type: "LOAD" }
    | { type: "SUCCESS"; result: TData }
    | { type: "FAILURE"; error: Error };

export function fetchDataReducer<TData>(
    state: FetchDataState<TData>,
    message: FetchDataMessage<TData>,
): FetchDataState<TData> {
    switch (message.type) {
        case "LOAD":
            if (state.status === "RELOADING" || state.status === "SUCCESS") {
                return {
                    status: "RELOADING",
                    data: state.data,
                };
            }
            return { status: "LOADING" };
        case "SUCCESS":
            return { status: "SUCCESS", data: message.result };
        case "FAILURE":
            return { status: "FAILED", error: message.error };
    }
}
