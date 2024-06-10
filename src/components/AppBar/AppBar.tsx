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
import logo from '../../assets/images/logo.jpg'
import './appBar.css'

export default function AppBar() {
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
        localStorage.setItem('UserData', JSON.stringify(response))
        setAuthUser(response)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCart = () => {
        console.log("auth id::" + authUser?.id)
        navigate('/cart', { state: { id: authUser?.id } })
    }

    return (<>

        <Box className="appbar-header">
            <Box className="appbar-hamburger">
                <i className="fa fa-bars" aria-hidden="true" style={{ color: 'grey' }}
                    onClick={toggleDrawer(true)}
                ></i>
            </Box>
            < Box className="logo">
                <img src={logo} alt="logo" height={65} width={100} />
            </Box>
            <Box className="appbar-headerLeft">
                <h1>Welcome to Shop Cart</h1>
            </Box>
            <Box>
                <div className="appbar-headerRight">
                    <a href=""><i className="fa-solid fa-cart-shopping" onClick={() => {
                        handleCart()
                    }}></i></a>

                </div>
            </Box>
            <Box className="appbar-headerRight">
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
                <div style={{ marginLeft: '20' }}>
                    <Button variant='contained' onClick={() => { handleLogout() }}>Logout</Button>
                </div>
            </Box>
        </Box >
        <Box >
            <Drawer open={open} onClose={toggleDrawer(false)} >
                <nav className="appbar-navigation">
                    <Link to='/' className="appbar-links" > Products</Link>
                    <Link to='/contact' className="appbar-links"> Contact</Link>
                    <Link to='/portfolio' className="appbar-links"> Portfolio</Link >
                    <Link to='/posts' className="appbar-links"> Posts</Link >
                    <Link to='/' className="appbar-links"> Back to Home</Link >
                </nav >
            </Drawer>
        </Box >

    </>)
}