import { useNavigate, useParams } from "react-router-dom"
import { Modal } from "../components/Modal"
import { svg } from "../components/Svgs"
import { Loader } from "../components/Loader"
import { useGetDeal } from "../customHooks/useGetDeal"
import { useDealActions } from "../customHooks/useDealsActions"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import type { RootState } from "../store/store"


export function DealDetails(): JSX.Element {
  const { dealId } = useParams<{dealId?:string}>()
  const navigate = useNavigate()

  const savedDeals = useSelector(
    (storeState: RootState) => storeState.dealModule.savedDeals
  )
  const { data, isLoading, error } = useGetDeal(dealId)
  const { toggleSaveDeal } = useDealActions()

  const deal = data?.deal

  function onClose(): void {
    navigate("/deal")
  }
  function onToggleSaveDeal(dealId: string): void {
    const msg = toggleSaveDeal(dealId)
    showSuccessMsg(`Deal was ${msg}`)
  }

  if (isLoading) return <Loader />
  if (error) showErrorMsg("Cannot load deal")
  if (!deal) return <Loader />

  return (
    <Modal onClose={onClose}>
      <div className="details-container">
        <h1>{deal.title}</h1>
        <p>{deal.description}</p>
        <img
          src={`https://robohash.org/${deal.title}?set=set1`}
          alt={deal.title}
          className="deal-img"
        />
        <div className="info-bar">
          <p>{`${deal.price} $`}</p>
          <p>{`Rating: ${deal.rating} `}</p>
          <p onClick={() => onToggleSaveDeal(deal.id)}>
            {savedDeals.includes(deal.id) ? svg.saved1 : svg.saved}
          </p>
        </div>
      </div>
    </Modal>
  )
}
