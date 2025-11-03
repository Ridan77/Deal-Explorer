import { DealPreview } from "./DealPreview"
import type { Deal } from "../types/deal"
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