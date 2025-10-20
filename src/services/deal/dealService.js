import { useQuery } from '@tanstack/react-query'

const BASE_URL =
    import.meta.env.MODE === 'production'
        ? '/api/deals'
        : 'http://localhost:3000/deals'

export function useDeals(filterBy = {}) {
    const { txt = '', category = '', sortBy = '', isDescending = false, page = 1, limit = 20 } = filterBy

    const params = new URLSearchParams()
    if (txt) params.append('title_like', txt)
    if (category) params.append('category', category)
    if (sortBy) {
        params.append('_sort', sortBy)
        params.append('_order', isDescending ? 'desc' : 'asc')
    }
    if (page) params.append('_page', page)
    if (limit) params.append('_limit', limit)

    const url = `${BASE_URL}?${params.toString()}`

    return useQuery({
        queryKey: ['deals', filterBy], // cache key depends on filter
        queryFn: async () => {
            const res = await fetch(url)
            if (!res.ok) throw new Error('Failed to fetch deals')
            const data = await res.json()
            return  {deals:data}
        },
        keepPreviousData: true,
    })
}
