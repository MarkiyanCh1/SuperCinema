import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie";
import { useGetMoviesQuery } from "../../services/TMDB";

const Movies = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const pageNumberFormated = parseInt(pageNumber, 10) || 1;
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page: pageNumberFormated,
    searchQuery,
  });

  const lg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const numberOfMovies = lg ? 17 : 19;

  useEffect(() => {
    setPage(pageNumberFormated || 1);
  }, [pageNumberFormated]);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please searh for something else.
        </Typography>
      </Box>
    );
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`/page/${newPage}`);
  };

  if (error) return "An error has occured.";

  return (
    <div>
      <FeaturedMovie movie={data?.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={pageNumberFormated}
        setPage={handlePageChange}
        totalPages={data.total_pages}
      />
    </div>
  );
};

export default Movies;
