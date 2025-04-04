import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { Sparklines, SparklinesLine } from "react-sparklines";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getCoinChartData } from "../lib/api";

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
  ath: number; // اضافه کردن ویژگی 'ath' (All-Time High)
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
  },
  {
    id: "total_volume",
    label: "Total Volume",
    minWidth: 100,
    align: "right",
  },
  { id: "sparkline", label: "7d Chart", minWidth: 100, align: "right" },
];

export default function CoinTable({
  coins,
  vs_currency,
}: {
  coins: Coin[];
  vs_currency: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedCoin, setSelectedCoin] = React.useState<Coin | null>(null);
  const [chartData, setChartData] = React.useState<any>(null);
  const [activeType, setActiveType] = React.useState<
    "prices" | "market_caps" | "total_volumes"
  >("prices");

  const handleRowClick = async (coin: Coin) => {
    setSelectedCoin(coin);
    setOpen(true);
    const data = await getCoinChartData(coin.id, vs_currency);
    setChartData(data);
    setActiveType("prices");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCoin(null);
    setChartData(null);
  };

  const currencySymbol =
    vs_currency === "USD" ? "$" : vs_currency === "EUR" ? "€" : "¥";

  return (
    <>
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
                <TableRow
                  hover
                  key={coin.id}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(coin)}
                >
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
                      const data = coin.sparkline_in_7d?.price || [];
                      const isUp = data[data.length - 1] - data[0] >= 0;
                      return (
                        <TableCell key={column.id} align="right">
                          <Sparklines data={data} svgWidth={100} svgHeight={30}>
                            <SparklinesLine color={isUp ? "green" : "red"} />
                          </Sparklines>
                        </TableCell>
                      );
                    }

                    const value = coin[column.id as keyof Coin];

                    if (
                      column.id === "current_price" &&
                      typeof value === "number"
                    ) {
                      return (
                        <TableCell key={column.id} align="right">
                          {currencySymbol + value.toLocaleString()}
                        </TableCell>
                      );
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
                        {typeof value === "number"
                          ? value.toLocaleString() 
                          : Array.isArray(value)
                          ? value.length > 0
                            ? value[0].toLocaleString() 
                            : "N/A"
                          : typeof value === "object" && value !== null
                          ? "N/A" 
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

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            width: "500px",
            borderRadius: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <img
              src={selectedCoin?.image}
              alt={selectedCoin?.name}
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
            <Typography variant="h6" fontWeight="bold">
              {selectedCoin?.name} ({selectedCoin?.symbol.toUpperCase()})
            </Typography>
          </Box>

          {chartData && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData[activeType].map((entry: [number, number]) => ({
                  time: new Date(entry[0]).toLocaleDateString(),
                  value: entry[1],
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  label={{ value: activeType, position: "insideBottom" }}
                  tick={false} 
                />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          <Stack direction="row" spacing={2} mt={3} justifyContent="center">
            {["prices", "market_caps", "total_volumes"].map((type) => (
              <Button
                key={type}
                size="small"
                variant={activeType === type ? "contained" : "outlined"}
                onClick={() => setActiveType(type as any)}
              >
                {type.replace("_", " ")}
              </Button>
            ))}
          </Stack>

          <Box mt={3}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              🔸 <strong>{activeType.replace("_", " ")}:</strong>{" "}
              {chartData?.[activeType]?.[
                chartData[activeType].length - 1
              ]?.[1].toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              🔹 <strong>Current Price:</strong>{" "}
              {selectedCoin?.current_price.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              🚀 <strong>ATH:</strong> {selectedCoin?.ath?.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
