import { styled } from "@mui/system";

const StyledSearchContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

export default StyledSearchContainer;
