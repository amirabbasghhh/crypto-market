"use client";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { getCoinsSearch } from "../lib/api";

interface IResults {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<IResults[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [loading, setLoading] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchCoins = async () => {
      if (!debouncedSearch.trim()) {
        setResults([]);
        setLoading(false);
        setShowNoResults(false);
        return;
      }

      setLoading(true);
      try {
        const res = await getCoinsSearch(debouncedSearch);
        const coins = res.coins || [];

        if (coins.length === 0) {
          setShowNoResults(true);
          setTimeout(() => {
            setShowNoResults(false);
          }, 2000);
        }

        setResults(coins);
      } catch (err) {
        console.error("Error fetching coins:", err);
        setResults([]);
        setShowNoResults(true);
        setTimeout(() => {
          setShowNoResults(false);
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [debouncedSearch]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <TextField
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "gray" },
            "&.Mui-focused fieldset": { borderColor: "#f97316" },
          },
          "& .MuiFormLabel-root": { color: "gray" },
          "& .MuiFormLabel-root.Mui-focused": { color: "gray" },
        }}
        id="search-input"
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
      />

      {/* Drop-down */}
      {search.trim() && !loading && (results.length > 0 || showNoResults) && (
        <div className="absolute overflow-y-auto max-h-[250px] top-full left-0 right-0 mt-2 border border-gray-300 p-2 rounded-lg bg-white shadow-md z-50">
          {showNoResults ? (
            <div className="text-gray-500 text-center py-2">No results found</div>
          ) : (
            results.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center gap-x-2 py-2 border-b border-gray-300"
              >
                <img src={coin.thumb} alt={coin.name} className="w-6 h-6" />
                <span>{coin.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
