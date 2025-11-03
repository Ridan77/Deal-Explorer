import { eventBus } from "../services/event-bus.service"
import { useState, useEffect, useRef } from "react"
import { svg } from "./Svgs"
interface UserMsgData {
  txt: string
  type: string
}
export function UserMsg(): JSX.Element | null {
  const [msg, setMsg] = useState<UserMsgData | null>(null)
  const timeoutIdRef = useRef<number | null>(null)

  useEffect(() => {
    const unsubscribe = eventBus.on("show-msg", (msg: UserMsgData) => {
      setMsg(msg)
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
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
