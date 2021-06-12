// Adapted from this Gist: https://gist.github.com/Granipouss/0f382fa8dc532a4252ab6828567a50c5
// From this article: https://blog.theodo.com/2019/05/fantastic-hooks/
import { useCallback, useEffect, useRef } from "react";

export function useIsMounted(): () => boolean {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return useCallback(() => isMounted.current, []);
}
