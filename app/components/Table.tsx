import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  sparkline_in_7d: {
    price: number[];
  };
}

const columns = [
  { id: "coin", label: "Coin", minWidth: 150 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "current_price", label: "Price", minWidth: 100, align: "right" },
  {
    id: "price_change_percentage_24h",
    label: "24h",
    minWidth: 100,
    align: "right",
    format: (value: number) => `${value.toFixed(2)}%`,
  },
  {
    id: "total_volume",
    label: "Total Volume",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString(),
  },
  {
    id: "sparkline",
    label: "7d Chart",
    minWidth: 100,
    align: "right",
  },
];

export default function CoinTable({
  coins,
  vs_currency,
}: {
  coins: Coin[];
  vs_currency: string;
}) {
  const currencySymbol =
    vs_currency === "USD" ? "$" : vs_currency === "EUR" ? "€" : "¥";

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align as "right" | "left"}
                  sx={{
                    width: "20%",
                    fontWeight: "bold",
                    bgcolor: "gray",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((coin) => (
              <TableRow hover key={coin.id}>
                {columns.map((column) => {
                  if (column.id === "coin") {
                    return (
                      <TableCell key={column.id}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <img
                            src={coin.image}
                            alt={coin.name}
                            width="24"
                            height="24"
                          />
                          <span style={{ textTransform: "uppercase" }}>
                            {coin.symbol}
                          </span>
                        </div>
                      </TableCell>
                    );
                  }

                  if (column.id === "sparkline") {
                    const sparklineData = coin.sparkline_in_7d?.price || [];
                    const isUp =
                      sparklineData[sparklineData.length - 1] -
                        sparklineData[0] >=
                      0;
                    const lineColor = isUp ? "green" : "red";

                    return (
                      <TableCell key={column.id} align="right">
                        <Sparklines
                          data={sparklineData}
                          svgWidth={100}
                          svgHeight={30}
                        >
                          <SparklinesLine
                            color={lineColor}
                            style={{ fill: "none" }}
                          />
                        </Sparklines>
                      </TableCell>
                    );
                  }

                  let value = coin[column.id as keyof Coin];

                  if (
                    column.id === "current_price" &&
                    typeof value === "number"
                  ) {
                    value = `${currencySymbol}${value.toLocaleString()}`;
                  }

                  if (
                    column.id === "price_change_percentage_24h" &&
                    typeof value === "number"
                  ) {
                    const isPositive = value >= 0;
                    return (
                      <TableCell
                        key={column.id}
                        align="right"
                        sx={{
                          color: isPositive ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {value.toFixed(2)}%
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={column.id}
                      align={column.align as "right" | "left"}
                    >
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
