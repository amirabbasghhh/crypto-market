"use client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortSelectorProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange }) => {
  return (
    <FormControl
      sx={{
        width:"100%",
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "gray" },
          "&:hover fieldset": { borderColor: "gray" },
          "&.Mui-focused fieldset": { borderColor: "#f97316" },
        },
        "& .MuiInputLabel-root": { color: "gray" },
        "& .MuiInputLabel-root.Mui-focused": { color: "gray" },
      }}
    >
      <InputLabel id="sort-label">sort</InputLabel>
      <Select
        labelId="sort-label"
        id="sort-select"
        value={value}
        label="sort"
        onChange={onChange}
      >
        <MenuItem value="market_cap_asc">market_cap_asc</MenuItem>
        <MenuItem value="market_cap_desc">market_cap_desc</MenuItem>
        <MenuItem value="volume_asc">volume_asc</MenuItem>
        <MenuItem value="volume_desc">volume_desc</MenuItem>
        <MenuItem value="id_asc">id_asc</MenuItem>
        <MenuItem value="id_asc">id_asc</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
