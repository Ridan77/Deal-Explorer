const { DEV, VITE_LOCAL } = import.meta.env


import { dealService as local } from './deal.service.local.js'
import { dealService as remote } from './deal.service.remote.js'



function getDefaultFilter() {
    return {
        txt: '',
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
console.log('service local?', VITE_LOCAL === 'true');
export const dealService = {  getDefaultFilter, ...service }


