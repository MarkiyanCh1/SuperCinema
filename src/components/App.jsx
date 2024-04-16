import React, { useRef } from "react";
import { CssBaseline } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  StyledDivRoot,
  StyledMainContent,
  StyledDivToolbar,
} from "./styles.js";
import useAlan from "./Alan.jsx";

import { Movies, Actors, MovieInfo, Navbar, Profile } from "./index";

const App = () => {
  const alanBtnContainer = useRef();
  useAlan();

  return (
    <StyledDivRoot>
      <CssBaseline />
      <Navbar />
      <StyledMainContent>
        <StyledDivToolbar />
        <Routes>
          {/* <Route index element={<Navigate to="/movies" replace />} /> */}
          <Route path="/movies" element={<Movies />} />
          {/* <Route path="/approved" element={<Movies />} /> */}
          <Route path="/page/:pageNumber" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      </StyledMainContent>
      <div ref={alanBtnContainer} />
    </StyledDivRoot>
  );
};

export default App;
