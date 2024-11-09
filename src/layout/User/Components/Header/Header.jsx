import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
  useMediaQuery,
  SwipeableDrawer,
} from '@mui/material'
import {
  MenuBook as MenuBookIcon,
  Home as HomeIcon,
  Groups as GroupsIcon,
  LocalLibrary as LocalLibraryIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import useIconInHeader from '../../../../hooks/HeaderIcon'
import '../../../../css/header.css'
import axios from 'axios'

const settings = [
  {
    label: 'Profile',
    path: '/my-profile',
  },
  {
    label: 'Logout',
    path: 'Logout',
  },
]

const Header = () => {
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const respon = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/auth/user-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setUser(respon.data)
      } catch (e) {
        console.log(e)
      }
    }

    setToken(localStorage.getItem('access_token'))
    if (token === localStorage.getItem('access_token')) {
      getUser()
    }
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    setToken(null)
    navigate('/')
  }

  const isMobile = useMediaQuery('(max-width:600px)')

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const toggleNotificationDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setNotificationDrawerOpen(open)
  }

  const homeIcon = useIconInHeader(<HomeIcon />, 'Home Page', '/home')
  const myBooks = useIconInHeader(<MenuBookIcon />, 'My books', '/mybooks')
  const groups = useIconInHeader(<GroupsIcon />, 'Groups', '/groups')
  const books = useIconInHeader(<LocalLibraryIcon />, 'Books', '/Books')

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <List>
        {isMobile && (
          <>
            <ListItem button>
              <HomeIcon />
              <ListItemText primary="Home Page" />
            </ListItem>
            <ListItem button>
              <MenuBookIcon />
              <ListItemText primary="My books" />
            </ListItem>
            <ListItem button>
              <GroupsIcon />
              <ListItemText primary="Groups" />
            </ListItem>
            <ListItem button>
              <Link to="/books">
                <LocalLibraryIcon />
                <ListItemText primary="Books" />
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  )

  const notifications = (
    <Box
      sx={{ width: 250, padding: 2 }}
      role="presentation"
      onClick={toggleNotificationDrawer(false)}
      onKeyDown={toggleNotificationDrawer(false)}
    >
      <Typography variant="h6">Notifications</Typography>
      <List>
        {['Notification 1', 'Notification 2', 'Notification 3'].map(
          (text, index) => (
            <ListItem key={index}>
              <ListItemText primary={text} />
            </ListItem>
          ),
        )}
      </List>
    </Box>
  )

  return (
    <>
      {user ? (
        <AppBar position="sticky" sx={{ backgroundColor: '#F4F1EA' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
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
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: '#000',
                }}
              >
                Social Book Network
              </Typography>
            </Stack>

            {!isMobile && (
              <Container sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}
                >
                  <Link to="/">
                    <Grid item xs={1}>
                      {homeIcon}
                    </Grid>
                  </Link>
                  <Link to="/my-books">
                    <Grid item xs={1}>
                      {myBooks}
                    </Grid>
                  </Link>
                  <Link to="/groups">
                    <Grid item xs={1}>
                      {groups}
                    </Grid>
                  </Link>
                  <Link to="/books">
                    <Grid item xs={1}>
                      {books}
                    </Grid>
                  </Link>
                </Grid>
              </Container>
            )}

            <Box
              sx={{
                flexGrow: 0,
                display: 'flex',
                alignItems: 'center',
                color: '#000',
                marginLeft: 'auto',
              }}
            >
              <IconButton
                size="large"
                aria-label="show new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
                onClick={toggleNotificationDrawer(true)}
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.image_url} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => {
                      handleCloseUserMenu()
                      if (setting.label === 'Logout') {
                        handleLogout()
                      }
                    }}
                  >
                    {setting.label === 'Logout' ? (
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    ) : (
                      <Link to={setting.path}>
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>

          <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
            {drawer}
          </Drawer>
          <SwipeableDrawer
            anchor="right"
            open={notificationDrawerOpen}
            onClose={toggleNotificationDrawer(false)}
            onOpen={toggleNotificationDrawer(true)}
          >
            {notifications}
          </SwipeableDrawer>
        </AppBar>
      ) : (
        <div>Loading....</div>
      )}
    </>
  )
}

export default Header
