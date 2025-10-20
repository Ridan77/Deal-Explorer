import { Link } from "react-router-dom"
import { svg } from "./Svgs"
import { useSelector } from "react-redux"
import { toggleSaveDeal } from "../store/actions/deal.actions"

export function DealPreview({ deal }) {
  const savedDeals = useSelector(
    (storeState) => storeState.dealModule.savedDeals
  )

  function onSave(ev) {
    ev.preventDefault()
    toggleSaveDeal(deal.id)
  }
  return (
    <Link to={`/deal/${deal.id}`} className="deal-preview">
      <p className="title">{deal.title}</p>

      <p className="price">{`${deal.price} $`}</p>
      <div className="stats">
        <p className="category">{`Category: ${deal.category} `}</p>
        <p className="category">{`Rating: ${deal.rating} `}</p>
      </div>
      <p onClick={onSave}>{savedDeals.includes(deal.id) ? svg.saved1: svg.saved}</p>
    </Link>
  )
}
