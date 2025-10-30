import { Link } from "react-router-dom"
import { svg } from "./Svgs"
import { useSelector } from "react-redux"
import { useDealActions } from "../customHooks/useDealsActions"
import { showSuccessMsg } from "../services/event-bus.service"

export function DealPreview({ deal }) {
  const savedDeals = useSelector(
    (storeState) => storeState.dealModule.savedDeals
  )
const { toggleSaveDeal } = useDealActions()

  function onSave(ev) {
    ev.preventDefault()
    const msg = toggleSaveDeal(deal.id)
    showSuccessMsg(`Deal was ${msg}`)
  }

  return (
    <Link to={`/deal/${deal.id}`} className="deal-preview">
      <p className="title">{deal.title}</p>

      <p className="price">{`${deal.price} $`}</p>
      <div className="stats">
        <p className="category">{`Category: ${deal.category} `}</p>
        <p className="category">{`Rating: ${deal.rating} `}</p>
      </div>
      <p onClick={onSave}>
        {savedDeals.includes(deal.id) ? svg.saved1 : svg.saved}
      </p>
    </Link>
  )
}
