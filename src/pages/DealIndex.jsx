import { useState, useEffect } from "react"
// import { useSelector } from "react-redux"
// import { loadDeals } from "../store/actions/deal.actions.js"
import { Outlet } from "react-router-dom"
import { useDeals } from "../services/deal/dealService.js"
import { DealList } from "../cmps/DealList.jsx"
import { Loader } from "../cmps/Loader.jsx"
import { dealService } from "../services/deal/index.js"
import { DealFilter } from "../cmps/DealFilter.jsx"

export function DealIndex() {
  //optional for real backend
  //load the deals using http service and disptach to store.
  // const deals = useSelector((storeState) => storeState.dealModule.deals)
  const [filterBy, setFilterBy] = useState(dealService.getDefaultFilter())

  // useEffect(()=>{
  //   loadDeals(filterBy)
  // },[filterBy])
  
  const { data, isLoading, error } = useDeals(filterBy)
 
  function onSetFilter(filterToSet) {
    setFilterBy(filterToSet)
  }

  if (error) return <p>Error loading deals</p>
  // if (!deals) return <Loader/>
  return (
    <section className="deal-index">
      <>
        <DealFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        {isLoading && !data && <Loader />}
        {data?.deals && <DealList deals={data.deals} />}
        <Outlet />
      </>
    </section>
  )
}
