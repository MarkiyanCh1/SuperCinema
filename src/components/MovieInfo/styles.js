import { styled } from "@mui/system";
import { Grid, Box, Modal, ButtonGroup } from "@mui/material";

import { Link } from "react-router-dom";

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  margin: "30px 0 !important",
  [theme.breakpoints.down("sm")]: {
    margin: "10px 0 !important",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

const ErrorBox = styled(Box)(({ theme }) => ({
  border:
    theme.palette.mode === "light" ? "2px solid #28deb7" : "2px solid #909cf5",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  width: "fit-content",
  padding: "20px",
  margin: "0 auto",
  backgroundColor: theme.palette.mode === "light" ? "#f0fff2" : "#f59090",
  boxShadow:
    theme.palette.mode === "light"
      ? "4px 3px 16px 0px #f59090"
      : "4px 3px 16px 0px #28deb7",
}));

const StyledPosterImg = styled("img")(({ theme }) => ({
  borderRadius: "20px",
  boxShadow:
    theme.palette.mode === "light"
      ? "0.5em 0.5em 2.5em #202020"
      : "0.5em 0.5em 2.5em #c0c0c0",
  width: "85%",
  height: "75%",
  margin: "0 auto",
  "@media (min-width:2200px)": {
    width: "75%",
    height: "90%",
    borderRadius: "30px",
  },
  [theme.breakpoints.down("lg")]: {
    margin: "0px auto 20px",
    width: "60%",
    height: "95%",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0px auto 0",
    width: "60%",
    height: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0px auto 0",
    width: "60%",
    marginBottom: "30px",
  },
}));

const StyledGridGenreContainer = styled(Grid)({
  margin: "10px 0 !important",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
});

const StyledGenreLink = styled(Link)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem 1rem",
  },
}));

const StyledGenreImage = styled("img")(({ theme }) => ({
  filter: theme.palette.mode === "dark" && "invert(1)",
  marginRight: "10px",
}));

const StyledCastImage = styled("img")({
  width: "100%",
  maxWidth: "7em",
  height: "8em",
  objectFit: "cover",
  borderRadius: "10px",
  paddingBottom: "10px",
});

const StyledDivButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  [theme.breakpoints.down("xlg")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
}));

const StyledButtonsContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.up("xl")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  [theme.breakpoints.down("xlg")]: {
    justifyContent: "center",
    gap: "20px",
  },

  [theme.breakpoints.down("xsm")]: {
    gap: 0,
  },
}));

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledIframe = styled("iframe")(({ theme }) => ({
  width: "50%",
  height: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: "90%",
  },
}));

export {
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
};
