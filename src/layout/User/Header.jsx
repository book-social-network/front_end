import * as React from "react";
import { useState } from "react";
import Logo from "../../assets/images/MeoAnhLongNgan.webp";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Container,
  Stack,
} from "@mui/material";
import {
  Home as HomeIcon,
  VideoLibrary as VideoLibraryIcon,
  Groups as GroupsIcon,
  LocalLibrary as LocalLibraryIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import useIconInHeader from "../../hooks/HeaderIcon";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", width: 250 }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <List>
        {settings.map((setting) => (
          <ListItem button key={setting}>
            <ListItemText primary={setting} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const homeIcon =useIconInHeader(<HomeIcon/>, "Home Page");
  const Video = useIconInHeader(<VideoLibraryIcon/>, "Video");
  const groups = useIconInHeader(<GroupsIcon/>, "Groups");
  const books = useIconInHeader(<LocalLibraryIcon/>, "Books");

  return (
    <AppBar position="static" sx={{ backgroundColor: "#3b5998" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

          <Stack>
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "block" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Social Book Network
          </Typography>
          </Stack>
        <Container>
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid xs={1}>
              {homeIcon}
            </Grid>
            <Grid xs={1}>
              {Video}
            </Grid>
            <Grid xs={1}>
              {groups}
            </Grid>
            <Grid xs={1}>
              {books}
            </Grid>
          </Grid>
        </Container>
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          <IconButton size="large" aria-label="show new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={Logo} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;
