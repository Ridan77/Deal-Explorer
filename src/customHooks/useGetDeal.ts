import { useQuery, UseQueryResult } from "@tanstack/react-query"
import type { DealResponse } from "../services/deal.service"
import { getDealById } from "../services/deal.service"

export function useGetDeal(dealId?: string): UseQueryResult<DealResponse> {

  return useQuery<DealResponse, Error>({
    queryKey: ["deal", dealId],
    queryFn: () => {
      if (!dealId) throw new Error("Missing dealId")
      return getDealById(dealId)
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, //  cache for 5 min
    enabled: !!dealId,
  })
}



