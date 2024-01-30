import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation, Navigate as Redirect, useNavigate } from 'react-router-dom';
import Path from './Commen/Path';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from './Redux/Auth/AuthActions';
import { Button } from '@mui/material';
import { DashboardRounded } from '@mui/icons-material';

const drawerWidth = 240;

function Layout(props) {
    const { Component, permission, setpermission } = props
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Auth = useSelector(state => state.Auth)




    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div className='drawer'>
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding hidden={!permission.dashBoard}>
                    <Link to={Path.dashBoard}>
                        <ListItemButton selected={location.pathname === Path.dashBoard}>
                            <ListItemIcon>
                                <DashboardRounded color={location.pathname === Path.dashBoard ? 'primary' : undefined} />
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding hidden={!permission.user}>
                    <Link to={Path.user}>
                        <ListItemButton selected={location.pathname === Path.user}>
                            <ListItemIcon>
                                <SupervisedUserCircleIcon color={location.pathname === Path.user ? 'primary' : undefined} />
                            </ListItemIcon>
                            <ListItemText primary={"User"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding hidden={!permission.kapan}>
                    <Link to={Path.kapan}>
                        <ListItemButton selected={location.pathname === Path.kapan}>
                            <ListItemIcon>
                                <AcUnitIcon color={location.pathname === Path.kapan ? 'primary' : undefined} />
                            </ListItemIcon>
                            <ListItemText primary={"Kapan"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding hidden={!permission.lot}>
                    <Link to={Path.lot}>
                        <ListItemButton selected={location.pathname === Path.lot}>
                            <ListItemIcon>
                                <ScatterPlotIcon color={location.pathname === Path.lot ? 'primary' : undefined} />
                            </ListItemIcon>
                            <ListItemText primary={"Lot"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding hidden={!permission.work}>
                    <Link to={Path.work}>
                        <ListItemButton selected={location.pathname === Path.work}>
                            <ListItemIcon>
                                <GroupWorkIcon color={location.pathname === Path.work ? 'primary' : undefined} />
                            </ListItemIcon>
                            <ListItemText primary={"Work"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => document.getElementById("root") : undefined;




    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: 1500,
                    width: { sm: `100%` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <div className="d-flex w-100 align-items-center justify-content-between">

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Responsive drawer
                        </Typography>
                        <Button variant='contained' color="error" size='small' onClick={() => {
                            dispatch(LoginAction())
                            localStorage.removeItem("permission")
                            localStorage.setItem("permission", JSON.stringify({ login: "/login", dashBoard: "/" }))
                            setpermission(JSON.parse(localStorage.getItem("permission")))
                            navigate(Path.login)
                        }}>
                            <ExitToAppIcon /> &nbsp; Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {!Auth ? <Redirect to={Path.login} /> : <Component />}
            </Box>
        </Box>
    );
}



export default Layout;
