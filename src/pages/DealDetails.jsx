import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../cmps/Modal"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { loadDeal } from "../store/actions/deal.actions.js"
import { LOADING_DONE, LOADING_START } from "../store/reducers/system.reducer"
import { svg } from "../cmps/Svgs"
import { Loader } from "../cmps/Loader"

export function DealDetails() {
  const { dealId } = useParams()
  const deal = useSelector((storeState) => storeState.dealModule.deal)
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  )
  const dialogRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getDeal(dealId)
  }, [])

  async function getDeal(dealId) {
    dispatch({ type: LOADING_START })
    try {
      await loadDeal(dealId)
    } catch (err) {
      console.log("Cannot load deal", err)
    } finally {
      dispatch({ type: LOADING_DONE })
    }
  }

  function onClose() {
    navigate("/deal")
  }
  function onChange({ target }) {
    setText(target.value)
  }

  if (!deal || isLoading) return <Loader />
  return (
    <section className="deal-details">
      <Modal onClose={onClose}>
        <div className="details-container">
          <h1>{deal.title}</h1>
          <img
            src={`https://robohash.org/${deal.title}?set=set1`}
            alt={deal.title}
            className="deal-img"
          />
        </div>
      </Modal>
    </section>
  )
}
