"use client";
import { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import SearchInput from "./SearchInput";
import { getCoins } from "../lib/api";
import CoinTable from "./Table";
import CircularProgress from "@mui/material/CircularProgress";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(""); 
      setCoins([]); 

      const fetchedCoins = await getCoins(currency);

      if (fetchedCoins.length === 0) {
        setError("خطا در دریافت اطلاعات! لطفاً مجدداً تلاش کنید.");
      }

      setCoins(fetchedCoins);
      setLoading(false);
    }

    fetchData();
  }, [currency]);

  return (
    <div>
      <div className="flex items-center gap-x-3 mb-10">
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
        <CurrencySelector value={currency} onChange={(e) => setCurrency(e.target.value)} />
      </div>

      {loading ? (
        <div className="flex h-screen items-center justify-center text-gray-500">
          <CircularProgress size={40} />
        </div>
      ) : error ? (
        <div className="text-center font-bold mt-10 text-red-500">{error}</div>
      ) : (
        <CoinTable coins={coins} vs_currency={currency} />
      )}
    </div>
  );
};

export default Coins;
