import React, { useEffect } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './components/listItems';
//components import
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus, setUserEmail, setUserId, setUserName, setUserRoles } from '../../features/userSlice'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIndex from './components/DashboardIndex';
import Posts from './Posts';
import Post from './components/Post';
import Users from './components/Users';
import CreatePost from './components/CreatePost';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function DashBoard() {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    //user state
    const dispatch = useDispatch()
    const userId = useSelector((state)=> state.userInfo.userId)
    const userRoles = useSelector((state)=> state.userInfo.roles)
    const userName = useSelector((state)=> state.userInfo.name)
    const userEmail = useSelector((state)=> state.userInfo.email)
    const loggedIn = useSelector((state)=> state.userInfo.logged_in)

    const token = localStorage.getItem('access_token')

    useEffect(()=>{
        const fetchuser = async ()=>{
            try{
                const response = await fetch('http://127.0.0.1:8000/api/currentUser', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                if(response.ok){
                    const data = await response.json()
                    const user = data.user
                    const roles = data.roles
                    const setRolesState = ()=>{
                        dispatch(setUserRoles(roles))
                        dispatch(setUserName(user.name))
                        dispatch(setUserEmail(user.email))
                        dispatch(setUserId(user.id))
                        dispatch(setLoginStatus(true))
                    }
                    setRolesState()
                }
            }catch(error){
                console.log(error.message)
            }
        }
        fetchuser()
    }, [])
    
    return (
        <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                }}
                >
                <MenuIcon />
                </IconButton>
                <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                Dashboard
                </Typography>
                <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
            </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {mainListItems}
            </List>
            </Drawer>
            <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
            >
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route index element={<DashboardIndex/>}/>
                <Route path='posts' element={<Posts/>} />
                <Route path='post/:postId' element={<Post/>}/>
                <Route path='users' element={<Users/>}/>
                <Route path='createPost' element={<CreatePost/>}/>
              </Routes>
              <Outlet/>
            </Container>
            </Box>
        </Box>
        
        </ThemeProvider>
    );
}
