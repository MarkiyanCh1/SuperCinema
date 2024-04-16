import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  AddCircleOutlineRounded,
  Favorite,
  FavoriteBorderOutlined,
  RemoveCircleOutlineRounded,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import notFound from "../../assets/images/Not_Found.jpg";
import {
  StyledGridContainer,
  ErrorBox,
  StyledPosterImg,
  StyledGridGenreContainer,
  StyledGenreImage,
  StyledGenreLink,
  StyledCastImage,
  StyledDivButtonContainer,
  StyledButtonsContainer,
  StyledButtonGroup,
  StyledModal,
  StyledIframe,
} from "./styles";
import MovieList from "../MovieList/MovieList.jsx";
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import genreIcons from "../../assets/genres";

const MovieInfo = () => {
  const [open, setOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const { data, error, isFetching } = useGetMovieQuery(id);

  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      list: "/recommendations",
      movie_id: id,
    });

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 400);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/favorite?api_key=${tmdbApiKey}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/watchlist?api_key=${tmdbApiKey}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Link to="/">Something went wrong - Go back.</Link>
      </Box>
    );
  }

  const handleButtonBack = () => {
    navigate(-1);
  };

  return (
    <StyledGridContainer container>
      <Grid
        display="flex"
        item
        sm={12}
        lg={4}
        sx={{ marginBottom: { md: "40px" } }}
      >
        <StyledPosterImg
          src={
            data?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
              : notFound
          }
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <StyledGridContainer item>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography gutterBottom variant="h6" align="center">
            {data?.runtime}min&nbsp; | &nbsp;
            {data?.spoken_languages[0]?.name}
          </Typography>
        </StyledGridContainer>
        <StyledGridGenreContainer item>
          {data?.genres?.map((genre) => (
            <StyledGenreLink
              key={genre?.name}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <StyledGenreImage
                src={genreIcons[genre?.name.toLowerCase()]}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </StyledGenreLink>
          ))}
        </StyledGridGenreContainer>
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem", textAlign: "justify" }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data?.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{
                        textDecoration: "none",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <StyledCastImage
                        src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`}
                        alt={character?.name}
                      />
                      <Typography color="textPrimary" align="center">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary" align="center">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <StyledDivButtonContainer>
            <StyledButtonsContainer
              style={{ maxWidth: "100%" }}
              item
              xs={12}
              sm={6}
            >
              <StyledButtonGroup
                sx={{ width: "100%" }}
                size={isSmall ? "small" : "medium"}
                variant="outlined"
              >
                <Button
                  style={{ border: "1px solid " }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  WEBSITE
                </Button>
                <Button
                  style={{ border: "1px solid " }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  style={{ border: "1px solid " }}
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  TRAILER
                </Button>
              </StyledButtonGroup>
            </StyledButtonsContainer>
            <StyledButtonsContainer
              style={{ maxWidth: "100%" }}
              item
              xs={12}
              sm={6}
            >
              <StyledButtonGroup
                sx={{ width: "100%" }}
                size={isSmall ? "small" : "medium"}
                variant="outlined"
              >
                <Button
                  style={{ border: "1px solid " }}
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />
                  }
                >
                  FAVORITE
                </Button>
                <Button
                  style={{ border: "1px solid " }}
                  onClick={addToWatchList}
                  endIcon={
                    isMovieWatchlisted ? (
                      <AddCircleOutlineRounded />
                    ) : (
                      <RemoveCircleOutlineRounded />
                    )
                  }
                >
                  WATCHLIST
                </Button>
                <Button
                  style={{ border: "1px solid " }}
                  endIcon={<ArrowBack />}
                  onClick={handleButtonBack}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                  >
                    BACK
                  </Typography>
                </Button>
              </StyledButtonGroup>
            </StyledButtonsContainer>
          </StyledDivButtonContainer>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations.results.length !== 0 ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <ErrorBox variant="h5" gutterBottom align="center">
            <Typography>Sorry, nothing was found.</Typography>
          </ErrorBox>
        )}
      </Box>
      {open && (
        <StyledModal
          closeAfterTransition
          open={open}
          onClose={() => setOpen(false)}
        >
          {data?.videos?.results?.length > 0 && (
            <StyledIframe
              autoPlay
              frameBorder="0"
              title="Trailer"
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              allow="autoplay"
            />
          )}
        </StyledModal>
      )}
    </StyledGridContainer>
  );
};

export default MovieInfo;
