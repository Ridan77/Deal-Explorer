import { Outlet } from "react-router-dom"
import { useDeals } from "../services/deal/dealService.js"
import { DealList } from "../cmps/DealList.jsx"
import { Loader } from "../cmps/Loader.jsx"

import { Header } from "../cmps/Header.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"

export function DealIndex() {
  const { data, isLoading, error } = useDeals()

  if (error) {
    showErrorMsg("Unable to load deals")
  }

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
