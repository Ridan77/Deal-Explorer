import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { DealsResponse } from "../services/deal.service"
import { getDeals } from "../services/deal.service"


export function useGetDeals(): UseQueryResult<DealsResponse,Error> {
  const filterBy = useSelector(
    (storeState: RootState) => storeState.dealModule.filterBy
  )

 return useQuery<DealsResponse,Error>({
    queryKey: ["deals", filterBy] as const,
    queryFn: () => getDeals(filterBy),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  })
}
