import {useCallback, useRef} from "react";
import {useIsMounted} from "./useIsMounted";

// if multiple calls are made to asyncCall() using this hook before the first has returned,
// they will all wait for the latest one to return and the rest will not return anything.
export function useLatestOnlyAsyncCall<TArgs extends unknown[], TResponse>(asyncCall: (...args: TArgs) => Promise<TResponse>): (...args: TArgs) => Promise<TResponse> {
    
    const callCount = useRef(0);
    const isMounted = useIsMounted();
    
    return useCallback((...args: TArgs): Promise<TResponse> => {
        const thisCallNumber = callCount.current + 1;
        callCount.current = thisCallNumber;
        
        return new Promise((resolve, reject) => {
            asyncCall(...args)
                .then(payload => {
                    if (isMounted() && callCount.current === thisCallNumber) {
                        resolve(payload);
                    }
                })
                .catch((error: Error) => {
                    if (isMounted() && callCount.current === thisCallNumber) {
                        reject(error);
                    }
                });
        });
    }, [asyncCall, isMounted]);
}
