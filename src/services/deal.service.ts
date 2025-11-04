import type { FilterBy } from "../types/filterBy"
import type { Deal } from "../types/deal"

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "/api/deals"
    : "http://localhost:3000/deals"

export interface DealsResponse {
  deals: Deal[]
  totalCount: number
}
export interface DealResponse {
  deal: Deal
}

export async function getDeals(filterBy: FilterBy): Promise<DealsResponse> {
  const { txt, category, sort, isDescending, page = 1, limit = 10 } = filterBy

  const params = new URLSearchParams()
  if (txt) params.append("title_like", txt)
  if (category) params.append("category", category)
  if (sort) {
    params.append("_sort", sort.toLowerCase())
    params.append("_order", isDescending ? "desc" : "asc")
  }
  params.append("_page", page.toString())
  params.append("_limit", limit.toString())
  try {
    const res = await fetch(`${BASE_URL}?${params.toString()}`)
    if (!res.ok) throw new Error(`Failed to fetch deals (${res.status})`)

    const totalCount = Number(res.headers.get("X-Total-Count"))
    const data = (await res.json()) as Deal[]
    return { deals: data, totalCount }
  } catch (error) {
    console.log("Couldnt get deals:", error)
    throw error
  }
}


export async function getDealById(dealId: string): Promise<DealResponse> {
  try {
    const res = await fetch(`${BASE_URL}/${dealId}`)
    if (!res.ok) throw new Error(`Failed to fetch deal (${res.status})`)
    const data = (await res.json()) as Deal
    return { deal: data }
  } catch (error) {
    console.error("Couldnt get deal:", error)
    throw error
  }
}

export function getDefaultFilter(): FilterBy {
  return {
    txt: "",
    category: "",
    sort: "",
    isDescending: false,
  }
}