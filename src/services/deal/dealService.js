import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const BASE_URL =
    import.meta.env.MODE === 'production'
        ? '/api/deals'
        : 'http://localhost:3000/deals'

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
export function useDeals(dealId = null) {
    const filterBy = useSelector((storeState) => storeState.dealModule.filterBy)
    const { txt, category, sortBy, isDescending, page, limit } = filterBy


    const params = new URLSearchParams()

    if (txt) params.append('title_like', txt)
    if (category) params.append('category', category)
    if (sortBy) {
        params.append('_sort', sortBy)
        params.append('_order', isDescending ? 'desc' : 'asc')
    }
    if (page) params.append('_page', page)
    if (limit) params.append('_limit', limit)

    const url = dealId
        ? `${BASE_URL}/${dealId}`
        : `${BASE_URL}?${params.toString()}`

    return useQuery({
        queryKey: dealId ? ['deal', dealId] : ['deals', filterBy],
        queryFn: async () => {
            // Artificial delay to simulate network latency, and to expose loader
            await delay(500)
            const res = await fetch(url)
            if (!res.ok) throw new Error('Failed to fetch deal(s)')
            const data = await res.json()
            return dealId ? { deal: data } : { deals: data }
        },
        keepPreviousData: true,
    })
}
