import { Typography } from '@mui/material';
import RssFeedIcon from '@mui/icons-material/RssFeed';
const Logo = () => {
  const isSmallScreen = window.innerWidth <= 900; // Adjust the breakpoint as needed

  return (
    <div>
    {!isSmallScreen && (
      <Typography fontWeight="700" fontSize="1.7rem">
        <RssFeedIcon />
      </Typography>
    )}
  </div>
  );
};

export default Logo;