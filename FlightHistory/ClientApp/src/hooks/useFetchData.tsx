import type { Reducer } from "react";
import { useCallback, useReducer } from "react";
import { useLatestOnlyAsyncCall } from "./useLatestOnlyAsyncCall";
import type { FetchDataMessage } from "./fetchDataReducer";
import { fetchDataReducer } from "./fetchDataReducer";

export type FetchDataState<TData> =
    | { status: "LOADING" }
    | { status: "RELOADING"; data: TData }
    | { status: "SUCCESS"; data: TData }
    | { status: "FAILED"; error: Error };

type FetchDataResult<TArgs extends unknown[], TData> = [
    (...args: TArgs) => void,
    FetchDataState<TData>,
];

export function useFetchData<TArgs extends unknown[], TData>(
    fetchFunction: (...args: TArgs) => Promise<TData>,
): FetchDataResult<TArgs, TData> {
    const [state, dispatch] = useReducer<Reducer<FetchDataState<TData>, FetchDataMessage<TData>>>(
        fetchDataReducer,
        { status: "LOADING" },
    );

    const latestOnlyFetch = useLatestOnlyAsyncCall(async (...args: TArgs) => {
        dispatch({ type: "LOAD" });
        return fetchFunction(...args);
    });

    const startFetchFunction = useCallback(
        async (...args: TArgs) => {
            return latestOnlyFetch(...args)
                .then((result) => dispatch({ type: "SUCCESS", result }))
                .catch((error) => dispatch({ type: "FAILURE", error }));
        },
        [latestOnlyFetch],
    );

    return [startFetchFunction, state];
}
