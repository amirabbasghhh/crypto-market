"use client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface CurrencySelectorProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ value, onChange }) => {
  return (
    <FormControl
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "gray" },
          "&:hover fieldset": { borderColor: "gray" },
          "&.Mui-focused fieldset": { borderColor: "#f97316" },
        },
        "& .MuiInputLabel-root": { color: "gray" },
        "& .MuiInputLabel-root.Mui-focused": { color: "gray" },
      }}
    >
      <InputLabel id="currency-label">currency</InputLabel>
      <Select
        labelId="currency-label"
        id="currency-select"
        value={value}
        label="currency"
        onChange={onChange}
      >
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="JPY">JPY</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
