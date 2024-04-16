import React from "react";
import { Typography, Box } from "@mui/material";

import Movie from "../Movie/Movie";
import { StyledBoxContainer } from "./styles";

const RatedCards = ({ title, movies }) => (
  <Box marginBottom="2rem">
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    {!movies?.results.length ? (
      <Typography margin="1rem 0" variant="subtitle1">
        {title === "Watchlist"
          ? "Watchlist some movies to see them here!"
          : "Favorite movies to see them here!"}
      </Typography>
    ) : (
      <StyledBoxContainer display="flex" flexWrap="wrap">
        {movies?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </StyledBoxContainer>
    )}
  </Box>
);

export default RatedCards;
