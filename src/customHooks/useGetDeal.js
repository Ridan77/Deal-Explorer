import { useQuery } from '@tanstack/react-query'

const BASE_URL =
    import.meta.env.MODE === 'production'
        ? '/api/deals'
        : 'http://localhost:3000/deals'

// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }
export function useGetDeal(dealId = null) {
    const url = `${BASE_URL}/${dealId}`

    return useQuery({
        queryKey: ['deal', dealId],
        queryFn: async () => {
            // Artificial delay to simulate network latency, and to expose loader
            // await delay(500)
            const res = await fetch(url)
            if (!res.ok) throw new Error('Failed to fetch deal(s)')
            const data = await res.json()
            return { deal: data }
        },
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5, //  cache for 5 min
    })
}

