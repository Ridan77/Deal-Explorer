import { eventBus, showSuccessMsg } from "../services/event-bus.service"
import { useState, useEffect, useRef } from "react"
import { svg } from "./Svgs"

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on("show-msg", (msg) => {
      setMsg(msg)
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 5000)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  function msgClass() {
    return msg ? "visible" : ""
  }
  return (
    <section className={`user-msg ${msg?.type} ${msgClass()}`}>
      <button onClick={closeMsg}>{svg.close}</button>
      <span>{msg?.txt}</span>
    </section>
  )
}
