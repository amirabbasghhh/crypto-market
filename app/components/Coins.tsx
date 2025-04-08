"use client";
import { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import SearchInput from "./SearchInput";
import { getCoins } from "../lib/api";
import CoinTable from "./Table";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import CryptoHighlights from "./CryptoHighlights";
import CryptoNews from "./CryptoNews";
import FeaturedArticles from "./FeaturedArticles";
import SortSelector from "./SortSelector";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [sort, setSort] = useState("market_cap_desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchCoinsData = async () => {
    setLoading(true);
    setError("");
    setCoins([]);

    try {
      const fetchedCoins = await getCoins(currency, page, sort);
      if (fetchedCoins.length === 0) {
        setError("هیچ کوینی پیدا نشد یا خطا در دریافت اطلاعات!");
      } else {
        setCoins(fetchedCoins);
      }
    } catch (err) {
      setError("خطا در دریافت اطلاعات! لطفاً مجدداً تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinsData();
  }, [currency, page, sort]);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      <CryptoHighlights />

      {/* Header Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 mb-10 mt-20">
        <div className="w-full">
          <SearchInput />
        </div>
        <div className="w-full">
          <CurrencySelector
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
        <div className="w-full">
          <SortSelector
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      {error ? (
        <div className="text-center font-bold mt-10 text-red-500">
          {error}
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center text-gray-500 h-60">
          <CircularProgress size={40} />
        </div>
      ) : (
        <>
          <CoinTable coins={coins} vs_currency={currency} />

          <div className="flex items-center justify-center mt-10">
            <Pagination
              count={10}
              variant="outlined"
              page={page}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": { color: "black" },
                "& .Mui-selected": {
                  backgroundColor: "#f97316 !important",
                  color: "white !important",
                },
              }}
            />
          </div>
        </>
      )}

      {/* Extra Sections */}
      <CryptoNews />
      <FeaturedArticles />
    </>
  );
};

export default Coins;
