import { useQuery, UseQueryResult } from "@tanstack/react-query"
import type { Deal } from "../types/deal"

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "/api/deals"
    : "http://localhost:3000/deals"

interface DealResponse {
  deal: Deal
}
export function useGetDeal(dealId?: string): UseQueryResult<DealResponse> {
  const url = `${BASE_URL}/${dealId}`

  return useQuery<DealResponse, Error>({
    queryKey: ["deal", dealId],
    queryFn: async () => {
      if (!dealId) throw new Error("Missing dealId")
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch deal(s)")
      const data = await res.json()
      return { deal: data }
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, //  cache for 5 min
    enabled: !!dealId,
  })
}
