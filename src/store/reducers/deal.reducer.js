export const SET_DEALS = 'SET_DEALS'
export const SET_DEAL = 'SET_DEAL'
export const SET_FILTER = 'SET_FILTER'
export const SAVE_DEAL = 'SAVE_DEAL'
export const UNSAVE_DEAL = 'UNSAVE_DEAL'

const initialState = {
    deals: null,
    deal: null,
    filterBy: {},
    savedDeals: JSON.parse(localStorage.getItem('SAVED_DEALS')) || [],
}

export function dealReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case SET_DEALS:
            newState = { ...state, deals: action.deals }
            break
        case SET_DEAL:
            newState = { ...state, deal: action.deal }
            break
        case SET_FILTER:
            newState = { ...state, filterBy: action.filterBy }
            break
        case SAVE_DEAL: {
            if (state.savedDeals.includes(action.dealId)) return state
            const savedDeals = [action.dealId, ...state.savedDeals]
            newState = { ...state, savedDeals }
            break
        }
        case UNSAVE_DEAL: {
            const savedDeals = state.savedDeals.filter(
                id => id !== action.dealId
            )
            newState = { ...state, savedDeals }
            break
        }
        default:
            return state
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    let state = initialState
    const deal1 = { _id: 'b101', vendor: 'Deal ' + parseInt('' + Math.random() * 10), speed: 12, owner: null, msgs: [] }
    const deal2 = { _id: 'b102', vendor: 'Deal ' + parseInt('' + Math.random() * 10), speed: 13, owner: null, msgs: [] }

    state = dealReducer(state, { type: SET_DEALS, deals: [deal1] })
    console.log('After SET_DEALS:', state)

    state = dealReducer(state, { type: ADD_DEAL, deal: deal2 })
    console.log('After ADD_DEAL:', state)

    state = dealReducer(state, { type: UPDATE_DEAL, deal: { ...deal2, vendor: 'Good' } })
    console.log('After UPDATE_DEAL:', state)

    state = dealReducer(state, { type: REMOVE_DEAL, dealId: deal2._id })
    console.log('After REMOVE_DEAL:', state)

    state = dealReducer(state, { type: SET_DEAL, deal: deal1 })
    console.log('After SET_DEAL:', state)

    const msg = { id: 'm' + parseInt('' + Math.random() * 100), txt: 'Some msg', by: { _id: 'u123', fullname: 'test' } }
    state = dealReducer(state, { type: ADD_DEAL_MSG, dealId: deal1._id, msg })
    console.log('After ADD_DEAL_MSG:', state)
}

