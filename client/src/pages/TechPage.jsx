import React from 'react';
import { Box } from '@mui/material';
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import NewsSlideTech from "../components/common/NewsSlideTech";

const HomePage = () => {
  return (
    <>
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Tech news today">
       <NewsSlideTech/>
      </Container>
      </Box>
    </>
  );
};

export default HomePage;