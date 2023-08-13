import { Box } from "@mui/material";
import { Swiper } from "swiper/react";

const AutoSwiper = ({ children }) => {
  return (
    <Box sx={{
      "& .swiper-slide": {
        width: {
          xs: "30%",
          sm: "35%",
          md: "13%",
          lg: "15.5%"
        }
      }
    }}>
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;