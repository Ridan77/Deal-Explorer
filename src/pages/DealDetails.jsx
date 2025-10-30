import { useNavigate, useParams } from "react-router-dom"
import { Modal } from "../components/Modal"
import { svg } from "../components/Svgs"
import { Loader } from "../components/Loader"
import { useGetDeal } from "../customHooks/useGetDeal.js"
import { useDealActions } from "../customHooks/useDealsActions.js"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function DealDetails() {
  const { dealId } = useParams()
  const savedDeals = useSelector(
    (storeState) => storeState.dealModule.savedDeals
  )
  const { data, isLoading, error } = useGetDeal(dealId)
  const { toggleSaveDeal } = useDealActions()

  const navigate = useNavigate()
  const deal = data?.deal

  function onClose() {
    navigate("/deal")
  }
  function onToggleSaveDeal(dealId) {
    const msg = toggleSaveDeal(dealId)
    showSuccessMsg(`Deal was ${msg}`)
  }

  if (isLoading) return <Loader />
  if (error) showErrorMsg("Cannot load deal")
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
