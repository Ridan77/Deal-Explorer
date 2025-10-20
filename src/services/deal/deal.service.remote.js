import { httpService } from '../http.service'

export const dealService = {
    query,
    getById,
}

async function query(filterBy = { txt: '' }) {
    return httpService.get(`deals`, filterBy)
}

function getById(dealId) {
    return httpService.get(`deals/${dealId}`)
}



