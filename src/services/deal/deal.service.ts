import type { FilterBy } from "../../types/filterBy";

 export function getDefaultFilter() : FilterBy {
    return {
        txt: '',
        category:'',
        sort:'', 
        isDescending:false, 
    }
}