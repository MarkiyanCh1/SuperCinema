import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const StyledLinks = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
}));

const StyledGenreImage = styled("img")(({ theme }) => ({
  filter: theme.palette.mode === "dark" ? "invert(1)" : "dark",
}));

export { StyledLinks, StyledGenreImage };
