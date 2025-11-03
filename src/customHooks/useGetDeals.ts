import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import type { Deal } from "../types/deal"

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "/api/deals"
    : "http://localhost:3000/deals"

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface DealsResponse {
  deals: Deal[]
  totalCount: number
}

export function useGetDeals(): UseQueryResult<DealsResponse,Error> {
  const filterBy = useSelector(
    (storeState: any) => storeState.dealModule.filterBy
  )

  const { txt, category, sort, isDescending, page = 1, limit = 10 } = filterBy

  const params = new URLSearchParams()
  if (txt) params.append("title_like", txt)
  if (category) params.append("category", category)
  if (sort) {
    params.append("_sort", sort.toLowerCase())
    params.append("_order", isDescending ? "desc" : "asc")
  }
  if (page) params.append("_page", page.toString())
  if (limit) params.append("_limit", limit.toString())

  const url = `${BASE_URL}?${params.toString()}`

  return useQuery<DealsResponse,Error>({
    queryKey: ["deals", filterBy] as const,
    queryFn: async () => {
      await delay(500)
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch deal(s)")
      const totalCount = Number(res.headers.get("X-Total-Count"))
      const data = await res.json()
      return {
        deals: data as Deal[],
        totalCount,
      }
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  })
}
