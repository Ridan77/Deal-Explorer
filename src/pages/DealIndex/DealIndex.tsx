import { Outlet } from "react-router-dom"
import { useGetDeals } from "../../customHooks/useGetDeals"
import { DealList } from "../../components/DealList/DealList"
import { Loader } from "../../components/Loader/Loader"
import { Header } from "../../components/Header/Header"
import { showErrorMsg } from "../../services/event-bus.service"
import "./DealIndex.css"


export function DealIndex() {
  const { data, isLoading, error } = useGetDeals()

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
