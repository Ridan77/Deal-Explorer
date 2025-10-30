import { useDispatch, useSelector } from "react-redux"
import { SAVE_DEAL, UNSAVE_DEAL, SET_FILTER } from "../store/reducers/deal.reducer.js"

export function useDealActions() {
    const dispatch = useDispatch()
    const savedDeals = useSelector(state => state.dealModule.savedDeals)

    function toggleSaveDeal(dealId) {
        const isSaved = savedDeals.includes(dealId)
        dispatch({
            type: isSaved ? UNSAVE_DEAL : SAVE_DEAL,
            dealId,
        })
        return isSaved ? 'removed from saved deals' : 'added to saved deals'
    }

    function setFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    return { toggleSaveDeal, setFilter }
}
