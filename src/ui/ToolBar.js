import React, {useState, useEffect, useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from '../contexts/AuthContext';
import { loginImplicitGrantFlow, loginAuthorizationCodeFlow} from '../utils/auth/authSpotify'
import spotifyGet from '../utils/auth/spotifyGet'
const pages = ['home', 'playlists', 'search', 'profile'];



const Layout = (props) => {
    const { logout, children } = props
    const login = () => loginAuthorizationCodeFlow(['user-modify-playback-state user-read-currently-playing user-read-playback-state user-read-private user-read-email'])
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [auth, setAuth] = useContext(AuthContext);
    const [profile, setProfile] = useState()
    const settings_logged_in = [{ name: "Logout", function: logout }];
    const settings_logged_out = [{ name: "Login with Spotify", function: login}];
    const settings = auth.loggedIn ? settings_logged_in : settings_logged_out;
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        if(auth.token){
            spotifyGet('/me', auth.token).then(res=>{
                setProfile(res)
            })
        }
        
    }, [auth])

    return (
        <AppBar position="static">
            <Container maxWidth={false}>
                <Toolbar disableGutters>                    
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { md: "flex",  },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                            {profile ? 
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                <Avatar
                                    alt={profile.name}
                                    src={profile.images[0].url}
                                />
                            </IconButton> : <Button
                                    onClick={login}
                                    key={pages.length + 1}
                                    variant='text'
                                    sx={{ color: "white" }}
                                >
                                    Login
                            </Button> }
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
                                <MenuItem
                                    key={setting.name}
                                    onClick={setting.function}
                                >
                                    <Typography textAlign="center">
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Layout;
