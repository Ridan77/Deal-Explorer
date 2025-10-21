# 🛒 Deal Explorer

**Deal Explorer** is a responsive web app for browsing, filtering, and saving product deals across multiple categories.  
It demonstrates practical use of **React**, **Redux**, and **TanStack Query**, with a clean architecture and modular code organization.

---

## 🧠 Implementation Explanation

### 🧩 Tech Stack
- **Frontend:** React (Hooks, functional components)
- **State Management:** Redux + custom hooks (`useSelector`, `useDispatch`)
- **Data Fetching:** TanStack React Query with caching & stale-time optimization
- **Styling:** CSS Modules / Tailwind (if applicable)
- **Tooling:** Vite for fast dev build and hot reload

### ⚙️ Architecture Overview
- `DealFilter.jsx`:  
  Controlled component managing search, category, and sorting filters. Uses debounced dispatches to Redux to prevent excessive API calls.

- `useDeals.js`:  
  Custom hook wrapping `useQuery` from TanStack Query. Handles caching, pagination, and query parameters built from the Redux filter state.

- `deal.actions.js`:  
  Dispatches actions for loading, saving, and toggling deals. Integrates with `dealService` for RESTful communication with the backend.

- `dealService.js`:  
  Abstracts API requests using the `fetch` API. Includes dynamic query string building and pagination support.

- `DealList.jsx` and `DealPreview.jsx`:  
  Presentation components rendering the deal cards and handling user interactions (save, sort, etc.).

### 🧰 Key Features
- 🔍 Real-time **search and filter** with debounce
- 📦 **Pagination** and lazy data loading
- 🕒 **Smart caching** via TanStack Query (`staleTime`, `cacheTime`)
- 💾 **Saved deals** toggle (persisted locally or via backend)
- 📱 Fully **responsive** design

---

## 📚 Documentation & References

These are the main resources and docs used during development:

- [React Docs – Official Guide](https://react.dev/learn)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/react)
- [MDN Web Docs – URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [Vite Official Docs](https://vitejs.dev/guide/)
- [Render Deployment Guide](https://render.com/docs/deploy-node-express-app)
- [PostCSS Docs (for optional nesting)](https://postcss.org/)

---

## ⏳ If I Had More Time...

With additional time, I would:
- ✅ Add **unit and integration tests** (Jest + React Testing Library)
- ✅ Add a **backend API** with Node/Express and MongoDB
- ✅ Implement **user authentication** (login/signup, saved deals per user)
- ✅ Integrate **infinite scrolling** instead of pagination
- ✅ Polish UI/UX with better transitions, skeleton loaders, and empty states
- ✅ Deploy CI/CD pipeline (GitHub Actions + Render or Vercel)
- ✅ Add PWA capabilities (offline browsing and caching)

---

## ⚖️ Trade-offs & Assumptions

- **Debounce vs Immediate Filtering:**  
  Used a 700ms debounce to balance responsiveness and API efficiency.

- **Caching vs Fresh Data:**  
  Set `staleTime` to keep results locally for better UX, trading off some data freshness.

- **Local Redux Filters:**  
  Redux handles filters globally; ideally these could sync with query params for shareable URLs.

- **Limited Backend Scope:**  
  Current version assumes a static or mock API; in production it should connect to a real service with authentication and rate limiting.

- **UI Simplicity:**  
  Focused on clean MVP rather than visual polish or animation complexity.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
