import { useSelector } from "react-redux"
import { DealFilter } from "./DealFilter"
import { useDeals } from "../services/deal/dealService"

export function Header() {
    const filterBy = useSelector((storeState) => storeState.dealModule.filterBy)
      const { data, isLoading, error } = useDeals()
      const { page = 1, limit = 10 } = filterBy
      const totalCount = data?.totalCount || 0
      const totalPages = Math.ceil(totalCount / limit)
      function changePage(diff) {
        setFilter({ ...filterBy, page: page + diff })
      }
  return (
    <header className="header">
      <h1 className="logo">Deals Explorer</h1>
      <DealFilter />
      {!!data.deals.length && (
          <header className="pagination">
            <button disabled={page <= 1} onClick={() => changePage(-1)}>
              Prev
            </button>
            <span>
              Page <strong>{page}</strong> of <strong>{totalPages || 1}</strong>
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => changePage(1)}>
              Next
            </button>
          </header>
        )}
    </header>
  )
}
