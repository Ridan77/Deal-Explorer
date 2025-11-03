import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

interface SelectBoxProps {
  handleChange: () => void
  options: string[]
  currentValue: string
  name: string
}
export function SelectBox({
  handleChange,
  options,
  currentValue,
  name,
}: SelectBoxProps): JSX.Element {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="name">{name}</InputLabel>
      <Select
        labelId="name"
        id="name"
        name={name.toLowerCase()}
        value={currentValue}
        label="Category"
        onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
