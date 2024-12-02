import React, { useState, useEffect } from 'react'
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
  Skeleton,
} from '@mui/material'
import {
  MenuBook as MenuBookIcon,
  Home as HomeIcon,
  Groups as GroupsIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  Leaderboard as LeaderboardIcon,
} from '@mui/icons-material'
import { FaUserFriends } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import useIconInHeader from '../../../../hooks/HeaderIcon'
import { useUserProfile } from '../../../../hooks/useUserProfile'
import Notification from '../Notification/notification'
import '../../../../css/header.css'
import AuthorizationAxios from '../../../../hooks/Request'

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
  const [anchorElAdd, setAnchorElAdd] = useState(null)
  const { isLoading, user } = useUserProfile()
  const [noti, setNoti] = useState()
  const getNoti = async () => {
    const res = await AuthorizationAxios.get('/api/notification/get-all')
    const notification = await res.data
    setNoti(notification)
  }
  useEffect(() => {
    getNoti()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/')
  }

  const isMobile = useMediaQuery('(max-width:600px)')

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenAddMenu = (event) => {
    setAnchorElAdd(event.currentTarget)
  }

  const handleCloseAddMenu = () => {
    setAnchorElAdd(null)
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
  const books = useIconInHeader(<FaUserFriends />, 'Friends', '/friends')
  const leaderboard = useIconInHeader(<LeaderboardIcon/>, 'Leaderboard', '/leaderboard')

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {isMobile && (
          <>
            <ListItem
              button
              component={Link}
              to="/home"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#000',
              }}
            >
              <HomeIcon />
              <ListItemText primary="Home Page" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/mybooks"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#000',
              }}
            >
              <MenuBookIcon />
              <ListItemText primary="My books" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/groups"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#000',
              }}
            >
              <GroupsIcon />
              <ListItemText primary="Groups" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/friends"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#000',
              }}
            >
              <FaUserFriends />
              <ListItemText primary="Friends" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/leaderboard"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#000',
              }}
            >
              <LeaderboardIcon />
              <ListItemText primary="Leaderboard" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  )

  if (isLoading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Skeleton variant="text" width={200} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    )
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#F4F1EA' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          color="#000"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon color="#000" />
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
              <Link to="/home">
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
              <Link to='/leaderboard'>
                <Grid item xs={1}>
                  {leaderboard}
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
            onClick={handleOpenAddMenu}
            size="large"
            aria-label="add menu"
            color="inherit"
          >
            <AddIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElAdd}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElAdd)}
            onClose={handleCloseAddMenu}
          >
            <MenuItem
              onClick={() => {
                navigate('/upload-type')
                handleCloseAddMenu()
              }}
            >
              Upload Type
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/upload-book')
                handleCloseAddMenu()
              }}
            >
              Upload Book
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/upload-author')
                handleCloseAddMenu()
              }}
            >
              Upload Author
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/create-group')
                handleCloseAddMenu()
              }}
            >
              Create Group
            </MenuItem>
          </Menu>

          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            onClick={toggleNotificationDrawer(true)}
          >
            <Badge badgeContent={noti?.quantity} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user ? user.user.name : ''}
                src={user ? user.user.image_url : ''}
              />
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
                  } else {
                    navigate(setting.path)
                  }
                }}
              >
                <Typography textAlign="center">{setting.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>

      <SwipeableDrawer
        anchor="right"
        open={notificationDrawerOpen}
        onClose={toggleNotificationDrawer(false)}
        onOpen={toggleNotificationDrawer(true)}
      >
        <Notification />
      </SwipeableDrawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}

export default Header
