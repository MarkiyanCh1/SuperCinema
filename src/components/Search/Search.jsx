import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import StyledSearchContainer from "./styles";
import { searchMovie } from "../../features/currentGenreOrCategory";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(query));
      navigate("/");
    }
  };

  if (location.pathname !== "/movies" && !location.pathname.startsWith("/page"))
    return null;

  return (
    <StyledSearchContainer>
      <TextField
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          sx: (theme) => ({
            color: theme.palette.mode === "light" && "black",
            filter: theme.palette.mode === "light" && "invert(1)",
            [theme.breakpoints.down("sm")]: {
              marginTop: "-10px",
              marginBottom: "10px",
            },
          }),
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </StyledSearchContainer>
  );
};

export default Search;
