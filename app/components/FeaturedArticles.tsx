"use client";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

const articles = [
  {
    id: 1,
    image: "f1.webp",
    category: "API",
    title: "How to Build a Liquidity Pool Finder App",
    author: "Cryptomaton",
    rating: 4.5,
    votes: 4,
  },
  {
    id: 2,
    image: "f2.webp",
    category: "API",
    title: "How to Build a Simple AI Model for Crypto Price Prediction",
    author: "Roxait",
    rating: 5.0,
    votes: 4,
  },
  {
    id: 3,
    image: "f3.webp",
    category: "Guides",
    title: "How to Gain Alpha With CoinGecko Categories",
    author: "CoinGecko",
    rating: 3.86,
    votes: 7,
  },
  {
    id: 4,
    image: "f4.webp",
    category: "Glossary",
    title: "What Are Rug Pulls and How You Can Avoid Them",
    author: "CoinGecko",
    rating: 4.07,
    votes: 30,
  },
];

const FeaturedArticles = () => {
  return (
    <Box p={2} sx={{ marginTop: "60px" }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Featured Articles
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {articles.map((article) => (
          <div key={article.id} className="h-full">
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
                image={article.image}
                alt={article.title}
                sx={{
                  height: 200,
                  width: "100%",
                  objectFit: "contain",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />

              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={1000}
                >
                  {article.category}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  fontWeight={700}
                  my={1}
                >
                  {article.title}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                  <AiFillStar color="#FFC107" />
                  <Typography variant="body2">{article.rating}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    ({article.votes} votes)
                  </Typography>
                </Stack>

                <Box mt="20px">
                  <Typography variant="body2" color="text.secondary">
                    {article.author}
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

export default FeaturedArticles;
