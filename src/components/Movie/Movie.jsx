import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import notFound from "../../assets/images/Not_Found.jpg";
import { StyledLink, StyledImage } from "./styles";

const Movie = ({ movie, i }) => (
  <Grid
    item
    xs={12}
    sm={6}
    md={4}
    lg={3}
    xl={2}
    sx={{ padding: "10px", margin: "0" }}
  >
    <Grow in key={i} timeout={(i + 1) * 250}>
      <StyledLink to={`/movie/${movie.id}`}>
        <StyledImage
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : notFound
          }
          alt={movie.title}
          sx={{
            ":hover": {
              boxShadow: (theme) =>
                `0em 0em 1em ${
                  theme.palette.mode === "light" ? "#707070" : "#bcbaba"
                }`,
            },
          }}
        />
        <Typography
          variant="h5"
          sx={(theme) => ({
            color: theme.palette.text.primary,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "200px",
            marginTop: "10px",
            marginBottom: "0",
            textAlign: "center",
          })}
        >
          {movie.title}
        </Typography>
        <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
          <div>
            <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
          </div>
        </Tooltip>
      </StyledLink>
    </Grow>
  </Grid>
);

export default Movie;
