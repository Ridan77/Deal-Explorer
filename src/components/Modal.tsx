import { Fragment } from "react"
import { svg } from "./Svgs"

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}


export function Modal({ children, onClose }:ModalProps) :JSX.Element {
  return (
    <Fragment>
      <section onClick={onClose} className="modal-backdrop"></section>
      <section className="modal-content">
        <main>{children}</main>
        <button className="close-btn" onClick={onClose}>
          {svg.close}
        </button>
      </section>
    </Fragment>
  )
}
