import { DealPreview } from "./DealPreview.jsx"

export function DealList({ deals }) {
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
