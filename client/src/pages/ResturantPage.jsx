import React from 'react';
import { Box } from '@mui/material';
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import ResturantSlide from '../components/common/ResturantSlide';

const HomePage = () => {
  return (
    <>
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Resturants Nearyby">
          <ResturantSlide/>
      </Container>
      </Box>
    </>
  );
};

export default HomePage;