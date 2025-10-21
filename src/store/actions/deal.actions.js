import { store } from '../store'
import { SAVE_DEAL, UNSAVE_DEAL,SET_FILTER } from '../reducers/deal.reducer'

export function setFilter(filterBy) {
    store.dispatch(getCmdSetFilter(filterBy))
}

export function toggleSaveDeal(dealId) {
    const { savedDeals } = store.getState().dealModule
    const isSaved = savedDeals.includes(dealId)
    if (isSaved) {
        store.dispatch(getCmdUnSaveDeal(dealId))
        return 'removed from saved deals'
    } else {
        store.dispatch(getCmdSaveDeal(dealId))
        return 'added to saved deals'
    }
}


// Command Creators:

function getCmdSaveDeal(dealId) {
    return {
        type: SAVE_DEAL,
        dealId
    }
}
function getCmdUnSaveDeal(dealId) {
    return {
        type: UNSAVE_DEAL,
        dealId
    }
}
function getCmdSetFilter(filterBy) {
    return {
        type: SET_FILTER,
        filterBy
    }
}


// unitTestActions()
async function unitTestActions() {
    await loadDeals()
}
