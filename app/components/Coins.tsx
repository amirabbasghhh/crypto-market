"use client";
import { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import SearchInput from "./SearchInput";
import { getCoins } from "../lib/api";
import CoinTable from "./Table";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      setCoins([]);

      const fetchedCoins = await getCoins(currency,page);

      if (fetchedCoins.length === 0) {
        setError("خطا در دریافت اطلاعات! لطفاً مجدداً تلاش کنید.");
      }

      setCoins(fetchedCoins);
      setLoading(false);
    }

    fetchData();
  }, [currency,page]);

  return (
    <div>
      <div className="flex items-center gap-x-3 mb-10">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CurrencySelector
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex h-screen items-center justify-center text-gray-500">
          <CircularProgress size={40} />
        </div>
      ) : error ? (
        <div className="text-center font-bold mt-10 text-red-500">{error}</div>
      ) : (
        <>
          <CoinTable coins={coins} vs_currency={currency} />
          <div className="flex item-center justify-center mt-10">
            <Pagination
              count={10}
              page={page}
              onChange={handlePageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'black',
                },
                '& .Mui-selected': {
                  backgroundColor: 'red',
                  color: 'black', 
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Coins;
