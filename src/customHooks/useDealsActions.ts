import { useDispatch, useSelector } from "react-redux"
import {
  SAVE_DEAL,
  UNSAVE_DEAL,
  SET_FILTER,
} from "../store/reducers/deal.reducer"
import type { FilterBy } from "../types/filterBy"
import type { RootState } from "../store/store"

export function useDealActions() {
  const dispatch = useDispatch()
  const savedDeals = useSelector(
    (storeState: RootState) => storeState.dealModule.savedDeals 
  )

  function toggleSaveDeal(dealId: string): string {
    const isSaved = savedDeals.includes(dealId)
    dispatch({
      type: isSaved ? UNSAVE_DEAL : SAVE_DEAL,
      dealId,
    })
    return isSaved ? "removed from saved deals" : "added to saved deals"
  }

  function isSaved(dealId: string): boolean {
    return savedDeals.includes(dealId)
  }

  function setFilter(filterBy: FilterBy): void {
    dispatch({ type: SET_FILTER, filterBy })
  }

  return { toggleSaveDeal, setFilter, isSaved }
}
