import { useSelector, useDispatch } from "react-redux";
import RssFeedIcon from '@mui/icons-material/RssFeed';

import { Stack, Toolbar } from "@mui/material";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";
import uiConfigs from "../../configs/ui.configs";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar }) => {

  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);

  const sidebarWidth = uiConfigs.size.sidebarWith;


  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px"><RssFeedIcon/> Feeds </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(item.state) ? "primary.main" : "unset"
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography textTransform="uppercase">
              {item.display}
            </Typography>} />
          </ListItemButton>
        ))}

        {user && (<>
          <Typography variant="h6" marginBottom="20px">PERSONAL</Typography>
          {menuConfigs.user.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                borderRadius: "10px",
                marginY: 1,
                backgroundColor: appState.includes(item.state) ? "primary.main" : "unset"
              }}
              component={Link}
              to={item.path}
              onClick={() => toggleSidebar(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText disableTypography primary={<Typography textTransform="uppercase">
                {item.display}
              </Typography>} />
            </ListItemButton>
          ))}
        </>)}
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          widh: sidebarWidth,
          borderRight: "0px"
        }
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;