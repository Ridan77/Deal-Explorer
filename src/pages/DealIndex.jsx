// import { loadDeals } from "../store/actions/deal.actions.js"
// import { dealService } from "../services/deal/index.js"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useDeals } from "../services/deal/dealService.js"
import { DealList } from "../cmps/DealList.jsx"
import { Loader } from "../cmps/Loader.jsx"
import { DealFilter } from "../cmps/DealFilter.jsx"
import { setFilter } from "../store/actions/deal.actions.js"

export function DealIndex() {
  //***********Optional for real backend************************
  //load the deals using http service and disptach to store.
  // const deals = useSelector((storeState) => storeState.dealModule.deals)
  // const [filterBy, setFilterBy] = useState(dealService.getDefaultFilter())
  // useEffect(()=>{
  //   loadDeals(filterBy)
  // },[filterBy])
  //**************************************************************
  const filterBy = useSelector((storeState) => storeState.dealModule.filterBy)
  const { data, isLoading, error } = useDeals()
  const { page = 1, limit = 10 } = filterBy
  const totalCount = data?.totalCount || 0
  const totalPages = Math.ceil(totalCount / limit)
  function changePage(diff) {
    setFilter({ ...filterBy, page: page + diff })
  }
  if (error) return <p>Error loading deals</p>
  console.log(totalCount)

  return (
    <section className="deal-index">
      <>
        <DealFilter />
        {data?.deals?.length && (
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
        {isLoading && !data && <Loader />}
        {data?.deals?.length ? (
          <DealList deals={data.deals} />
        ) : (
          <h3 className="no-deals">No Deals to show</h3>
        )}

        <Outlet />
      </>
    </section>
  )
}
