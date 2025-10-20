import { dealService } from '../../services/deal'
import { store } from '../store'
import { SET_DEALS, SET_DEAL, SAVE_DEAL, UNSAVE_DEAL,SET_FILTER } from '../reducers/deal.reducer'
import { showErrorMsg } from '../../services/event-bus.service'

export async function loadDeals(filterBy = { txt: '' }) {
    try {
        const deals = await dealService.query(filterBy)
        store.dispatch(getCmdSetDeals(deals))
    } catch (err) {
        console.log('Cannot load deals', err)
        throw err
    }
}

export async function loadDeal(dealId) {
    try {
        const deal = await dealService.getById(dealId)
        store.dispatch(getCmdSetDeal(deal))
    } catch (err) {
        console.log('Cannot load deal', err)
        showErrorMsg("Cannot load deal")
        throw err
    }
}

export function setFilter(filterBy) {
    store.dispatch(getCmdSetFilter(filterBy))
}
export function toggleSaveDeal(dealId) {
    const { savedDeals } = store.getState().dealModule
    const isSaved = savedDeals.includes(dealId)
    if (isSaved) {
        store.dispatch(getCmdUnSaveDeal(dealId))
    } else {
        store.dispatch(getCmdSaveDeal(dealId))
    }
}


// Command Creators:
function getCmdSetDeals(deals) {
    return {
        type: SET_DEALS,
        deals
    }
}
function getCmdSetDeal(deal) {
    return {
        type: SET_DEAL,
        deal
    }
}
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
