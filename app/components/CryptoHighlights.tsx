// components/CryptoHighlights.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function CryptoHighlights() {
  const [trending, setTrending] = useState<any[]>([]);
  const [topGainers, setTopGainers] = useState<any[]>([]);
  const [marketCap, setMarketCap] = useState("");
  const [volume24h, setVolume24h] = useState("");
  const [marketCapChange, setMarketCapChange] = useState(0);
  const API_KEY = "CG-2dos2tsQyepiGzFCzGJXzJyG";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-2dos2tsQyepiGzFCzGJXzJyG",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const trendingRes = await fetch(
        "https://api.coingecko.com/api/v3/search/trending",
        options
      );
      const json = await trendingRes.json();

      const trendingData = json.coins.map((coin: any) => ({
        name: coin.item.name,
        symbol: coin.item.symbol,
        thumb: coin.item.thumb,
        price_btc: coin.item.price_btc,
      }));

      setTrending(trendingData);

      const marketRes = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h&x_cg_demo_api_key=${API_KEY}`
      );

      const topGainersData = marketRes.data
        .filter((coin: any) => coin.price_change_percentage_24h !== null)
        .sort(
          (a: any, b: any) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
        .slice(0, 3);

      setTopGainers(topGainersData);

      const res = await fetch("https://api.coingecko.com/api/v3/global", {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-2dos2tsQyepiGzFCzGJXzJyG",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch global data");
      }

      const data = await res.json();
      const marketCapUsd = data.data.total_market_cap.usd;
      const volumeUsd = data.data.total_volume.usd;
      const change = data.data.market_cap_change_percentage_24h_usd;


      setMarketCap(marketCapUsd.toLocaleString());
      setVolume24h(volumeUsd.toLocaleString());
      setMarketCapChange(change);
    };

    fetchData();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          Cryptocurrency Prices by Market Cap
        </h2>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        The global cryptocurrency market cap today is $
        {(+marketCap / 1e12).toFixed(2)} Trillion, a{" "}
        <span
          className={marketCapChange < 0 ? "text-red-500" : "text-green-500"}
        >
          {marketCapChange.toFixed(1)}%
        </span>{" "}
        change in the last 24 hours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-y-6">
          {/* Market Cap */}
          <div className="rounded-xl border-2  border-gray-300 p-4 space-y-2">
            <div className="text-2xl font-semibold">${marketCap}</div>
            <div className="text-gray-500 text-sm flex items-center gap-2">
              Market Cap
              {marketCapChange < 0 ? (
                <span className="text-red-500 flex items-center gap-1">
                  <ArrowDownRight className="w-4 h-4" />
                  {Math.abs(marketCapChange).toFixed(1)}%
                </span>
              ) : (
                <span className="text-green-500 flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  {marketCapChange.toFixed(1)}%
                </span>
              )}
            </div>
          </div>

          {/* 24h Volume */}
          <div className="rounded-xl border-2  border-gray-300 p-4 space-y-2">
            <div className="text-2xl font-semibold">${volume24h}</div>
            <div className="text-gray-500 text-sm">24h Trading Volume</div>
          </div>
        </div>

        {/* Trending */}
        <div className=" flex flex-col items-between justify-between rounded-xl border-2  border-gray-300 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">🔥 Trending</span>
            <span className="text-blue-500 text-sm cursor-pointer">
              View more &gt;
            </span>
          </div>
          {trending.slice(0, 3).map((coin) => (
            <div
              key={coin.symbol}
              className="flex justify-between items-center py-1"
            >
              <div className="flex items-center gap-2">
                <img src={coin.thumb} className="w-5 h-5 rounded-full" />
                <span className="text-sm font-medium">{coin.name}</span>
              </div>
              <span className="text-xs text-gray-500">
                {coin.symbol.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Top Gainers */}
        <div className=" rounded-xl border-2 border-gray-300 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">🚀 Top Gainers</span>
            <span className="text-blue-500 text-sm cursor-pointer">
              View more &gt;
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {topGainers.map((coin) => (
              <div key={coin.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={coin.image} className="w-5 h-5 rounded-full" />
                  <span className="text-sm font-medium">{coin.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-800">
                    ${coin.current_price.toFixed(5)}
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    +{coin.price_change_percentage_24h.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
