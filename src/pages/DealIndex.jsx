// import { loadDeals } from "../store/actions/deal.actions.js"
// import { dealService } from "../services/deal/index.js"
// import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useDeals } from "../services/deal/dealService.js"
import { DealList } from "../cmps/DealList.jsx"
import { Loader } from "../cmps/Loader.jsx"
import { DealFilter } from "../cmps/DealFilter.jsx"
import { setFilter } from "../store/actions/deal.actions.js"
import { Header } from "../cmps/Header.jsx"

export function DealIndex() {
  //***********Optional for real backend************************
  //load the deals using http service and disptach to store.
  // const deals = useSelector((storeState) => storeState.dealModule.deals)
  // const [filterBy, setFilterBy] = useState(dealService.getDefaultFilter())
  // useEffect(()=>{
  //   loadDeals(filterBy)
  // },[filterBy])
  //**************************************************************
  const { data, isLoading, error } = useDeals()
 
  if (error) return <p>Error loading deals</p>

  return (
    <section className="deal-index">
      <>
        <Header />
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
