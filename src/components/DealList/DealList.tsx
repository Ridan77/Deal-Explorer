import { DealPreview } from "../DealPreview/DealPreview"
import type { Deal } from "../../types/deal"
import "./DealList.css"

interface DealListProps {
  deals: Deal[]
}

export function DealList({ deals }: DealListProps) {
  return (
    <ul className="deal-list">
      {deals.map((deal) => (
        <li className="deal-li" key={deal.id}>
          <DealPreview deal={deal} />
        </li>
      ))}
    </ul>
  )
}
