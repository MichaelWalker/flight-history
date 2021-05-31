import {Reducer, useCallback, useReducer} from "react";
import {useLatestOnlyAsyncCall} from "./useLatestOnlyAsyncCall";

type FetchDataState<TData> = 
    | { status: 'LOADING' }
    | { status: 'RELOADING', data: TData }
    | { status: 'SUCCESS', data: TData }
    | { status: 'FAILED', error: Error }

type FetchDataMessage<TData> = 
    | { type: 'LOAD' }
    | { type: 'SUCCESS', result: TData }
    | { type: 'FAILURE', error: Error }

function fetchDataReducer<TData>(state: FetchDataState<TData>, message: FetchDataMessage<TData>): FetchDataState<TData> {
    switch (message.type) {
        case 'LOAD':
            if (state.status === 'RELOADING' || state.status === 'SUCCESS') {
                return { status: 'RELOADING', data: state.data }
            }
            return { status: 'LOADING' }
        case 'SUCCESS':
            return { status: 'SUCCESS', data: message.result }
        case 'FAILURE':
            return { status: 'FAILED', error: message.error }
    }
}

type FetchDataResult<TArgs extends unknown[], TData> = [
    (...args: TArgs) => void,
    FetchDataState<TData>, 
]

export function useFetchData<TArgs extends unknown[], TData>(fetchFunction: (...args: TArgs) => Promise<TData>): FetchDataResult<TArgs, TData> {
    
    const [state, dispatch] = useReducer<Reducer<FetchDataState<TData>, FetchDataMessage<TData>>>(
        fetchDataReducer, { status: 'LOADING' }
    );
    
    const latestOnlyFetch = useLatestOnlyAsyncCall((...args: TArgs) => {
        dispatch({ type: 'LOAD' });
        return fetchFunction(...args);
    });
    
    const startFetchFunction = useCallback((...args: TArgs) => {
        return latestOnlyFetch(...args)
            .then(result => dispatch({ type: 'SUCCESS', result }))
            .catch(error => dispatch({ type: 'FAILURE', error }))
    }, [latestOnlyFetch]);
    
    return [startFetchFunction, state];
}
