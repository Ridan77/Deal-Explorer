import { Link } from "react-router-dom"
import { svg } from "./Svgs"
import { useSelector } from "react-redux"
import { useDealActions } from "../customHooks/useDealsActions"
import { showSuccessMsg } from "../services/event-bus.service"
import type { MouseEvent } from "react"

import type { Deal } from "../types/deal"

interface DealPreviewProps {
  deal: Deal
}

export function DealPreview({ deal }: DealPreviewProps) {
  // Type the state selector (temporary `any` for simplicity; we’ll fix store typing later)

  const savedDeals = useSelector(
    (storeState: any) => storeState.dealModule.savedDeals as string[]
  )

  const { toggleSaveDeal, isSaved } = useDealActions()

  function onSave(ev: MouseEvent<HTMLElement>) {
    ev.preventDefault()
    const msg = toggleSaveDeal(deal.id)
    showSuccessMsg(`Deal was ${msg}`)
  }
  const isDealSaved = isSaved(deal.id)
  return (
    <Link to={`/deal/${deal.id}`} className="deal-preview">
      <p className="title">{deal.title}</p>

      <p className="price">{`${deal.price} $`}</p>

      <div className="stats">
        <p className="category">{`Category: ${deal.category}`}</p>
        <p className="category">{`Rating: ${deal.rating}`}</p>
      </div>

      <p onClick={onSave}>
        {isDealSaved ? svg.saved1 : svg.saved}
      </p>
    </Link>
  )
}
