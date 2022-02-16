import {useState, useCallback, useEffect} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useEffect(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {

        setLoading(true)

        try {
            const response = await fetch(url, {method, body, headers})

            if (!response.ok) {
                throw new Error(`Couldn't fetch ${response.url}, status: ${response.status}`)
            }

            const data = await response.json()
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            return
        }

    }, [])

    const clearError = useCallback(() => setError(null), [])
    return {loading, error, request, clearError}
}