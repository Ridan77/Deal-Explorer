import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import type { SelectChangeEvent } from "@mui/material/Select"

interface SelectBoxProps {
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | SelectChangeEvent<string>
  ) => void
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
  const labelId = `${name}-label`
  const selectId = `${name}-select`

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={labelId}>{name}</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        name={name.toLowerCase()}
        value={currentValue}
        label={name}
        onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
