"use client";
import TextField from "@mui/material/TextField";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <TextField
      sx={{
        width:"30%",
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "gray" },
          "&:hover fieldset": { borderColor: "gray" },
          "&.Mui-focused fieldset": { borderColor: "#f97316" },
        },
        "& .MuiFormLabel-root": { color: "gray" },
        "& .MuiFormLabel-root.Mui-focused": { color: "gray" },
      }}
      id="search-input"
      label="search"
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
