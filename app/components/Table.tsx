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
  sparkline_in_7d: { price: number[] };
  ath: number;
}

const columns: {
  id: string;
  label: string;
  align?: "left" | "right" | "center" | "justify" | "inherit";
}[] = [
  { id: "coin", label: "Coin" },
  { id: "name", label: "Name" },
  { id: "current_price", label: "Price", align: "right" },
  { id: "price_change_percentage_24h", label: "24h", align: "right" },
  { id: "total_volume", label: "Total Volume", align: "right" },
  { id: "sparkline", label: "7d Chart", align: "right" },
];


const CoinTable = ({
  coins,
  vs_currency,
}: {
  coins: Coin[];
  vs_currency: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCoin, setSelectedCoin] = React.useState<Coin | null>(null);
  const [chartData, setChartData] = React.useState<any>(null);
  const [activeType, setActiveType] = React.useState<
    "prices" | "market_caps" | "total_volumes"
  >("prices");

  const currencySymbol = vs_currency === "USD" ? "$" : vs_currency === "EUR" ? "€" : "¥";

  const handleRowClick = React.useCallback(async (coin: Coin) => {
    setSelectedCoin(coin);
    setOpen(true);
    const data = await getCoinChartData(coin.id, vs_currency);
    setChartData(data);
    setActiveType("prices");
  }, [vs_currency]);

  const formatValue = (val: any) =>
    typeof val === "number" ? val.toLocaleString() : val ?? "N/A";

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(({ id, label, align }) => (
                  <TableCell
                    key={id}
                    align={align ?? "left"}
                    sx={{ fontWeight: "bold", bgcolor: "gray", color: "white" }}
                  >
                    {label}
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
                  {columns.map(({ id, align }) => {
                    if (id === "coin") {
                      return (
                        <TableCell key={id}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <img src={coin.image} alt={coin.name} width={24} height={24} />
                            <span style={{ textTransform: "uppercase" }}>{coin.symbol}</span>
                          </div>
                        </TableCell>
                      );
                    }

                    if (id === "sparkline") {
                      const data = coin.sparkline_in_7d?.price ?? [];
                      const isUp = data[data.length - 1] - data[0] >= 0;
                      return (
                        <TableCell key={id} align="right">
                          <Sparklines data={data} svgWidth={100} svgHeight={30}>
                            <SparklinesLine color={isUp ? "green" : "red"} />
                          </Sparklines>
                        </TableCell>
                      );
                    }

                    const value = coin[id as keyof Coin];

                    if (id === "current_price") {
                      return (
                        <TableCell key={id} align="right">
                          {currencySymbol + " " + formatValue(value)}
                        </TableCell>
                      );
                    }

                    if (id === "price_change_percentage_24h" && typeof value === "number") {
                      const isPositive = value >= 0;
                      return (
                        <TableCell
                          key={id}
                          align="right"
                          sx={{ color: isPositive ? "green" : "red", fontWeight: "bold" }}
                        >
                          {value.toFixed(2)}%
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={id} align={align ?? "left"}>
                        {formatValue(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            width: 500,
            borderRadius: 2,
          }}
        >
          {selectedCoin && (
            <>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <img
                  src={selectedCoin.image}
                  alt={selectedCoin.name}
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
                </Typography>
              </Box>

              {chartData && (
                <>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={chartData[activeType].map(([time, value]: [number, number]) => ({
                        time: new Date(time).toLocaleDateString(),
                        value,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={false} />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#f97316" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>

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
                    <Typography variant="body2" mb={1}>
                      🔸 <strong>{activeType.replace("_", " ")}:</strong>{" "}
                      {formatValue(chartData[activeType]?.at(-1)?.[1])}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      🔹 <strong>Current Price:</strong>{" "}
                      {formatValue(selectedCoin.current_price)}
                    </Typography>
                    <Typography variant="body2">
                      🚀 <strong>ATH:</strong> {formatValue(selectedCoin.ath)}
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CoinTable;
