import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import {
  StyledCardContainer,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
} from "./styles";

const FeaturedMovie = ({ movie }) => {
  if (!movie) return null;

  return (
    <StyledCardContainer component={Link} to={`/movie/${movie.id}`}>
      <StyledCard>
        <StyledCardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
        />
        <Box padding="20px">
          <StyledCardContent>
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </StyledCardContent>
        </Box>
      </StyledCard>
    </StyledCardContainer>
  );
};

export default FeaturedMovie;
