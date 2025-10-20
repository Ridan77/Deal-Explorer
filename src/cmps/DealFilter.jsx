import { useEffect, useRef, useState } from "react"
import { debounce } from "../services/util.service.js"
import { useSelector } from "react-redux"
import { setFilter } from "../store/actions/deal.actions.js"

export function DealFilter() {
  const filterBy = useSelector((storeState) => storeState.dealModule.filterBy)
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const onSetFilterDebounce = useRef(
    debounce((filter) => setFilter(filter), 700)
  ).current

  useEffect(() => {
    onSetFilterDebounce(filterByToEdit)
  }, [filterByToEdit])

 
  function handleChange({ target }) {
    const { name, type, value, checked } = target
    let newValue
    if (type === "checkbox") newValue = checked
    else if (type === "number" || type === "range")
      newValue = value === "" ? "" : +value
    else newValue = value
    setFilterByToEdit((prev) => ({ ...prev, [name]: newValue }))
  }
  return (
    <section className="deal-filter">
      <h1 className="logo">Deals Explorer</h1>
      <form>
        <input
          name="txt"
          onChange={handleChange}
          value={filterByToEdit.txt}
          placeholder="Search by title..."
          autoComplete="off"
        />
        <select
          name="category"
          value={filterByToEdit.category}
          onChange={handleChange}>
          <option value="">Category </option>
          <option value="Home">Home </option>
          <option value="Electronics">Electronics </option>
          <option value="Sports">Sports </option>
        </select>
        <div className="sort-control">
          <select
            name="sortBy"
            value={filterByToEdit.sortBy}
            onChange={handleChange}>
            <option value="">Sort By </option>
            <option value="price">Price </option>
            <option value="rating">Rating </option>
          </select>
          <label title="Sort Descending" className="switch">
            <input
              checked={!!filterByToEdit.isDescending}
              name="isDescending"
              onChange={handleChange}
              type="checkbox"
            />
            <span className="slider"></span>
          </label>
        </div>
      </form>
    </section>
  )
}
