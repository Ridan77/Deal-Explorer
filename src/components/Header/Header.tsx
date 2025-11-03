import { useSelector } from "react-redux"
import { DealFilter } from "../DealFilter/DealFilter"
import { useGetDeals } from "../../customHooks/useGetDeals"
import { useDealActions } from "../../customHooks/useDealsActions"
import { FilterBy } from "../../types/filterBy"
import type { RootState } from "../../store/store"
import "./Header.css"


export function Header(): JSX.Element {
  const filterBy = useSelector(
    (storeState: RootState) => storeState.dealModule.filterBy
  )
  const { setFilter } = useDealActions()

  const { data } = useGetDeals()
  const { page = 1, limit = 10 } = filterBy
  const totalCount = data?.totalCount || 0
  const totalPages = Math.ceil(totalCount / limit)
  const categories = data?.deals
    ? [...new Set(data?.deals.map((deal) => deal.category))]
    : []

  function changePage(diff: number): void {
    setFilter({ ...filterBy, page: page + diff })
  }
  return (
    <header className="header">
      <h1 className="logo">Deals Explorer</h1>
      <DealFilter categories={categories} />
      {!!data?.deals.length && (
        <header className="pagination">
          <button disabled={page <= 1} onClick={() => changePage(-1)}>
            Prev
          </button>
          <span>
            Page <strong>{page}</strong> of <strong>{totalPages || 1}</strong>
          </span>
          <button disabled={page === totalPages} onClick={() => changePage(1)}>
            Next
          </button>
        </header>
      )}
    </header>
  )
}
