"use client";
import { useState } from "react";
import CurrencySelector from "./CurrencySelector";
import SearchInput from "./SearchInput";
const Coins = () => {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("USD");

  return (
    <div>
      <div className="flex item-center gap-x-3">
         <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
         <CurrencySelector value={currency} onChange={(e) => setCurrency(e.target.value)} />
      </div>
    </div>
  );
};

export default Coins;
