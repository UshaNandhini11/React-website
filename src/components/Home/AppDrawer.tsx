import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AppDrawer() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.clear()
        navigate('/login')
    }

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
            <Box className="headerLeft">
                <Button variant='contained' onClick={() => {
                    handleLogout()
                }}>Logout</Button>
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