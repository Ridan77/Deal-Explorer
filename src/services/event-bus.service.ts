export const SHOW_MSG = "show-msg"

type EventMap = {
  [SHOW_MSG]: { txt: string; type: "success" | "error" | "info" }
}
type Listener<T> = (data: T) => void

function createEventEmitter<Events extends Record<string, any>>() {
  const listenersMap: Partial<Record<keyof Events, Listener<any>[]>> = {}

  return {
    on<K extends keyof Events>(evName: K, listener: Listener<Events[K]>) {
      listenersMap[evName] = listenersMap[evName]
        ? [...listenersMap[evName]!, listener]
        : [listener]
      return () => {
        listenersMap[evName] = listenersMap[evName]!.filter(
          (func) => func !== listener
        )
      }
    },
    emit<K extends keyof Events>(evName: K, data: Events[K]) {
      if (!listenersMap[evName]) return
      listenersMap[evName].forEach((listener) => listener(data))
    },
  }
}
export const eventBus = createEventEmitter<EventMap>()

export function showUserMsg(msg: EventMap[typeof SHOW_MSG]) {
  eventBus.emit(SHOW_MSG, msg)
}

export function showSuccessMsg(txt: string) {
  showUserMsg({ txt, type: "success" })
}
export function showErrorMsg(txt: string) {
  showUserMsg({ txt, type: "error" })
}

;(window as any).showUserMsg = showUserMsg
