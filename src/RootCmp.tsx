import { Routes, Route, Navigate } from "react-router"
import { DealIndex } from "./pages/DealIndex"
import { DealDetails } from "./pages/DealDetails"
import { UserMsg } from "./components/UserMsg"

export function RootCmp(): JSX.Element {
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
