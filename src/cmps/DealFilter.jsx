import { useEffect, useRef, useState } from "react"
import { debounce } from "../services/util.service.js"
import { useDealActions } from "../customHooks/useDealsActions.js"
import { getDefaultFilter } from "../services/deal/deal.service.js"

import { SelectBox } from "./SelectBox.jsx"
import TextField from "@mui/material/TextField"
import { IconButton, InputAdornment } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

export function DealFilter({ categories }) {
  const [filterByToEdit, setFilterByToEdit] = useState(getDefaultFilter())
  const sortCategories = ["", "Price", "Rating"]
  const { setFilter } = useDealActions()
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
      <form>
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          variant="outlined"
          label="Search"
          autoComplete="off"
          value={filterByToEdit.txt}
          name="txt"
          onChange={handleChange}
          slotProps={{
            input: {
              endAdornment: filterByToEdit.txt && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear text"
                    onClick={() =>
                      setFilterByToEdit((prev) => ({ ...prev, txt: "" }))
                    }
                    edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {categories.length > 0 && (
          <SelectBox
            name={"Category"}
            handleChange={handleChange}
            currentValue={filterByToEdit.category}
            options={categories}
          />
        )}
        <div className="sort-control">
          <SelectBox
            name={"Sort"}
            handleChange={handleChange}
            currentValue={filterByToEdit.sort}
            options={sortCategories}
          />
          <FormControlLabel
            control={
              <Switch
                checked={filterByToEdit.isDescending}
                onChange={(ev) =>
                  setFilterByToEdit((prev) => ({
                    ...prev,
                    isDescending: ev.target.checked,
                  }))
                }
              />
            }
            label="Descending"
          />
        </div>
      </form>
    </section>
  )
}
