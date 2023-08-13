import { Paper, Stack, Button, Box, Typography } from '@mui/material';
import React from 'react';
import Container from './Container';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Typography variant="body2" align="center">
        Created by ChristyG@2023
      </Typography>
    </Container>
  );
};
export default Footer;