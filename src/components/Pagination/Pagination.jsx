import React from "react";
import {
  StyledDivContainer,
  StyledButton,
  StyledTypographyPageNumber,
} from "./styles";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage(currentPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <StyledDivContainer>
      <StyledButton
        onClick={handlePrev}
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </StyledButton>
      <StyledTypographyPageNumber variant="h4">
        {currentPage}
      </StyledTypographyPageNumber>
      <StyledButton
        onClick={handleNext}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </StyledButton>
    </StyledDivContainer>
  );
};

export default Pagination;
