import { Routes, Route, Navigate } from "react-router"
import { DealIndex } from "./pages/DealIndex.jsx"
import { DealDetails } from "./pages/DealDetails.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"


export function RootCmp() {
  return (
    <section className="main-container">
      <UserMsg />
      <Routes>
        <Route path="/" element={<Navigate to="/deal" />} />
        <Route path="/deal" element={<DealIndex />}>
          <Route path=":dealId" element={<DealDetails />} />
        </Route>
      </Routes>
    </section>
  )
}
