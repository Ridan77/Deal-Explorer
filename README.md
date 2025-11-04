> ##  Improved Version Notice
> This is the **improved and refactored version** following a detailed **code review**.  
>  
> **Key improvements include:**
> -  Migration of the entire codebase to **TypeScript** for better type safety and maintainability  
> -  Refined **directory structure** for clearer separation and encapsulation of components  
> -  Removal of **anti-pattern store usage** and redundant code  
> -  Enhanced **linting and code consistency**  
> -  Refactored components for **better reusability** and single-responsibility logic  
> -  Integration of **external UI libraries (MUI)** for a cleaner and more professional interface  
> - Improved **custom hooks and service layers** for clearer separation between logic and presentation  





# 🛒 Deal Explorer

**Deal Explorer** is a fluid React web app for exploring, filtering, and saving product deals across multiple categories.  
It demonstrates practical use of **React**, **Redux**, and **TanStack Query**, focusing on modular design and efficient state synchronization.

---

##  Implementation Explanation

###  Tech Stack
- **Frontend:** React (Hooks, functional components)
- **State Management:** Redux (`useSelector`, `useDispatch`)
- **Data Fetching:** TanStack React Query (`useQuery`) with controlled stale-time caching
- **Tooling:** Vite for fast development and hot module replacement
- **Persistence:** LocalStorage for saved deals

###  Architecture Overview
- **`DealFilter.jsx`**  
  Controlled component that manages search text, category, and sort options.  
  Uses a debounced Redux dispatch (`setFilter`) to prevent excessive re-renders.

- **`useDeals.js`**  
  Custom hook wrapping TanStack’s `useQuery`.  
  Builds dynamic query parameters from the Redux filter state and manages caching via `staleTime`.
  A small artificial **delay** is added inside the hook to simulate backend latency — this helps demonstrate loading states and improve UX realism during development.


- **`deal.actions.js`**  
  Responsible for loading deals, updating the filter, and handling saved deals.  
  

- **`dealService.js`**  
  Abstracts data retrieval logic; currently local or mock-based.  
  Provides helpers for querying, sorting, and pagination if needed later.

- **`DealList.jsx` / `DealPreview.jsx`**  
  Presentation components for rendering the deal cards and handling interactions such as saving.

---


## ⏳ If I Had More Time...

With more development time, I would:
-  Add **unit and integration tests** (Jest + React Testing Library)  
-  Connect to a **real backend API** (Node/Express + MongoDB)  
-  Replace static pagination with **infinite scrolling**  
-  Add more polished **UI/UX**, transitions, and functionality.   

---

##  Trade-offs & Assumptions

- **Performance vs Responsiveness:**  
  Implemented a 700 ms debounce for filter updates to prevent unnecessary state dispatches and re-renders.  
  The trade-off is a slight delay in search responsiveness for smoother overall performance.

- **Caching Simplicity:**  
  Used only `staleTime` from TanStack Query for lightweight client-side caching.  
  This minimizes redundant requests but doesn’t include background refresh or cache invalidation logic.

- **Data Source Assumption:**  
  The current implementation assumes that all deals are retrieved from a static or mock data source,  
  without remote updates or server synchronization.

- **Global Filter State:**  
  Filters are managed centrally via Redux for simplicity.  
  In a larger application, these could be synced with URL parameters for shareable or bookmarkable views.

- **Feature Scope:**  
  Chose to omit lazy loading and infinite scroll for clarity and stability;  
  all data is fetched per filter change instead.


##  Quick Start

```bash
# Install dependencies
npm install

# Run server
npm run server

# Run development server
npm run dev