import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useSelector } from "react-redux";

import { useGetListQuery } from "../../services/TMDB";
import RatedCards from "../RatedCards/RatedCards";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.removeItem("request_token");
    localStorage.removeItem("session_id");
    localStorage.removeItem("accountId");
    window.location.href = "/";
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="2em"
      >
        <Typography variant="h4">My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favourite or watchlist same movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" movies={favoriteMovies} />
          <RatedCards title="Watchlist" movies={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
