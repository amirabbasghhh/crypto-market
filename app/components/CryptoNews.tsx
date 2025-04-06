import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { FaBitcoin } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const newsData = [
  {
    id: 1,
    image: "img1.webp",
    title:
      "This Week in Bitcoin: BTC Holds Steady as Trump's Trade War Wrecks Stocks",
    change: "-0.4%",
    source: "Decrypt",
    time: "6 minutes ago",
    extra: null,
  },
  {
    id: 2,
    image: "img2.webp",
    title: "Mining Difficulty Rises 6.81% as Bitcoin Hashrate Hits Record High",
    change: "-0.4%",
    source: "Bitcoin.com",
    time: "10 minutes ago",
    extra: "2 more",
  },
  {
    id: 3,
    image: "img3.webp",
    title: "Utility, volatility and longevity: Looking beyond the hype",
    change: "-0.4%",
    source: "Cointelegraph",
    time: "16 minutes ago",
    extra: "6 more",
  },
  {
    id: 4,
    image: "img3.webp",
    title:
      "No country wins a global trade war, BTC to surge as a result: Analyst",
    change: "-0.4%",
    source: "Cointelegraph",
    time: "17 minutes ago",
    extra: "13 more",
  },
];

const CryptoNews = () => {
  return (
    <Box p={2} sx={{marginTop:"60px"}}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Latest Crypto News
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {newsData.map((news) => (
          <div key={news.id} className="h-full">
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                image={news.image}
                alt={news.title}
                sx={{
                  height: 180,
                  objectFit: "cover", 
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />

              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {news.title}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Chip
                    icon={<FaBitcoin color="orange" size={16} />}
                    label={`BTC ${news.change}`}
                    sx={{ bgcolor: "#f1f1f1", color: "#f44336", fontSize: 12 }}
                    size="small"
                  />
                  {news.extra && (
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<IoIosArrowDown />}
                      sx={{
                        textTransform: "none",
                        fontSize: 12,
                        borderRadius: 2,
                      }}
                    >
                      {news.extra}
                    </Button>
                  )}
                </Box>
                <Box mt="auto">
                  <Typography variant="body2" color="text.secondary">
                    {news.source}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {news.time}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CryptoNews;
