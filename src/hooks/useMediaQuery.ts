import {useSyncExternalStore} from "react";


export default function useMediaQuery(query: string): boolean {
    return useSyncExternalStore(
        (notify) => {
            const mql = window.matchMedia(query)
            mql.addEventListener("change", notify)
            return () => window.removeEventListener("change", notify)
        },
        () => window.matchMedia(query).matches,
        () => false,
    )
}