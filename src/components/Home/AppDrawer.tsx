import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser } from "../../service/auth";
import MenuItem from "@mui/material/MenuItem";
import { Profile } from "../../entity/profile";

export default function AppDrawer() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [authUser, setAuthUser] = useState<Profile>();

    useEffect(() => {
        setTimeout(() => {
            authenticatedUser();
        }, 1000);

    }, [])

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.clear()
        navigate('/login')
    }
    const authenticatedUser = async () => {
        let response = await authenticateUser();
        setAuthUser(response)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (<>
        <Box className="header">
            <Box className="hamburger">
                <i className="fa fa-bars" aria-hidden="true" style={{ color: 'grey' }}
                    onClick={toggleDrawer(true)}
                ></i>
            </Box>
            <Box className="headerLeft">
                <h1>Welcome to our Page</h1>
            </Box>
            <Box>
                <div className="headerRight">
                    <a href="#"><i className="fa-solid fa-cart-shopping"></i></a>
                </div>
            </Box>
            <Box className="headerRight">
                <div>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Jeanne" src={authUser?.image} />
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
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Link to='/profile' style={{ fontSize: '20px', textDecoration: 'none' }}> My Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Link to='/' style={{ fontSize: '20px', textDecoration: 'none' }} > Products</Link>
                        </MenuItem>
                    </Menu>
                </div>
                <div style={{ marginLeft: '20', backgroundColor: 'fuchsia' }}>
                    <Button variant='contained' onClick={() => {
                        handleLogout()
                    }}>Logout</Button>
                </div>
            </Box>
        </Box>
        <Box >
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <nav className="navigation">
                    <Link to='/' style={{ fontSize: '20px', textDecoration: 'none' }} > Products</Link>
                    <Link to='/contact' style={{ fontSize: '20px', textDecoration: 'none' }}> Contact</Link>
                    <Link to='/portfolio' style={{ fontSize: '20px', textDecoration: 'none' }}> Portfolio</Link >
                    <Link to='/' > Back to Home</Link >
                </nav >
            </Drawer>
        </Box>
    </>)
}