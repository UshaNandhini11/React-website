import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCategory from "./ProductCategory";

export default function AppDrawer() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('token')
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
            <div className="headerLeft">
                {/* <IconButton type="submit" aria-label="search">
                    <i className="fas fa-search"></i>
                </IconButton> */}
                <TextField
                    id="search-bar"
                    className="text"
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                />
            </div>
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
        <ProductCategory />
    </>)
}