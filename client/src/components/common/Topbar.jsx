import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      display: 'flex', // Default: display flex
      alignItems: 'center', // Default: center vertically
      justifyContent: 'center', // Default: center horizontally
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
      '@media (max-width: 600px)': {
        display: 'block', // Change display for smaller screens
        alignItems: 'initial', // Reset vertical alignment
        justifyContent: 'initial', // Reset horizontal alignment
      },
    },
  });
};

const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const location = useLocation();

  // State to track expanded state of main menu items
  const [expandedMenuItems, setExpandedMenuItems] = useState({});

  // Function to toggle the expanded state of a main menu item
  const toggleMenuItem = (index) => {
    setExpandedMenuItems((prevExpandedMenuItems) => ({
      ...prevExpandedMenuItems,
      [index]: !prevExpandedMenuItems[index],
    }));
  };

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} style={{ backgroundColor: 'black' }}/>
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }} style={{ backgroundColor: 'black' }}>
          <Toolbar lg={{ alignItems: "center", justifyContent: "space-between" }} sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>

            <Box flexGrow={1} alignItems="center" display={{ xs: "none", md: "flex" }}>
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <div key={index}>
                  <Button
                    sx={{
                      color: 'white',
                      mr: 2,
                      position: "relative"
                    }}
                    component={Link}
                    to={item.path}
                    variant={appState.includes(item.state) ? "contained" : "text"}
                    onClick={() => item.subRoutes && toggleMenuItem(index)}
                  >
                    {item.display}
                    {item.subRoutes && (
                      <span
                        style={{
                          position: "absolute",
                          right: "8px",
                          transform: expandedMenuItems[index] ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease"
                        }}
                      >
                        <ArrowDropDownIcon />
                      </span>
                    )}
                  </Button>
                  {item.subRoutes && expandedMenuItems[index] && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "#fff",
                        zIndex: 1,
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        minWidth: "200px",
                        mt: "4px"
                      }}
                    >
                      {item.subRoutes.map((subItem, subIndex) => (
                        <Button
                          key={subIndex}
                          sx={{
                            color: 'white',
                            justifyContent: "flex-start",
                            px: 3,
                            py: 2,
                            width: "100%",
                            textAlign: "left",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.04)"
                            }
                          }}
                          component={Link}
                          to={item.path + subItem.path}
                          variant={appState.includes(subItem.state) ? "contained" : "text"}
                        >
                          {subItem.display}
                        </Button>
                      ))}
                    </Box>
                  )}
                </div>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
              </IconButton>
            </Box>
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button variant="contained" onClick={() => dispatch(setAuthModalOpen(true))}>
                  sign in
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
