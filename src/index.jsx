import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { RootCmp } from "./RootCmp"
import "./assets/styles/main.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  </QueryClientProvider>
)
