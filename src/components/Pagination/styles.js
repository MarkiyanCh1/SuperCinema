import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";

const StyledDivContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledButton = styled(Button)(() => ({
  margin: "30px 2px",
}));

const StyledTypographyPageNumber = styled(Typography)(({ theme }) => ({
  margin: "0 30px !important",
  color: theme.palette.text.primary,
}));

export { StyledDivContainer, StyledButton, StyledTypographyPageNumber };
