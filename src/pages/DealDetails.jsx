import { useNavigate, useParams } from "react-router-dom"
import { Modal } from "../cmps/Modal"
import { svg } from "../cmps/Svgs"
import { Loader } from "../cmps/Loader"
import { useDeals } from "../services/deal/dealService.js"
import { toggleSaveDeal } from "../store/actions/deal.actions"
import { useSelector } from "react-redux"
export function DealDetails() {
  const { dealId } = useParams()
  const savedDeals = useSelector(
    (storeState) => storeState.dealModule.savedDeals
  )
  const { data, isLoading, error } = useDeals(dealId)

  const navigate = useNavigate()

  function onClose() {
    navigate("/deal")
  }
  const deal = data?.deal
  if (isLoading) return <Loader />
  return (
    <section className="deal-details">
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
            <p onClick={() => toggleSaveDeal(deal.id)}>
              {savedDeals.includes(deal.id) ? svg.saved1 : svg.saved}
            </p>
          </div>
        </div>
      </Modal>
    </section>
  )
}
