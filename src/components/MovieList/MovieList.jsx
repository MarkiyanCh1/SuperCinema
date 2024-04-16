import React from "react";

import { StyledGrid } from "./styles";
import Movie from "../Movie/Movie";

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <StyledGrid container>
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </StyledGrid>
  );
};

export default MovieList;
