import React from 'react';
import tmdbConfigs from "../api/configs/tmdb.configs";
import { Box } from '@mui/material';
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";
import NewsSlide from '../components/common/NewsSlide';

const HomePage = () => {
  return (
    <>
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="hot news today">
          <NewsSlide/>
      </Container>
        <Container header="popular movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>
        <Container header="top rated movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;