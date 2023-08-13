import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const main = [
 
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home"
  },
  {
    display: "technology",
    path: "/technology",
    icon: <LiveTvOutlinedIcon />,
    state: "technology"
  },
  {
    display: "resturants",
    path: "/resturants",
    icon: <LiveTvOutlinedIcon />,
    state: "resturants"
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search"
  },
]


const user = [
  {
    display: "favorites",
    path: "/favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    state: "favorite"
  },

];

const menuConfigs = { main, user };

export default menuConfigs;