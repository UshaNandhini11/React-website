import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Contact() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    return (<>
        <Box className="header">
            <Box className="hamburger">
                <i className="fa fa-bars" aria-hidden="true" style={{ color: 'grey' }}
                    onClick={toggleDrawer(true)}
                //  {() => {
                //     handleHamburgerIcon()
                // }}
                ></i>
            </Box>
            <Box className="headerLeft">
                <h1>Contact Page</h1>
            </Box>

            <Box >
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {/* {
                    isMenuOpen ? (<> */}
                    <nav className="navigation">
                        <Link to='/about' style={{ fontSize: '30px', textDecoration: 'none' }}  > About</Link>
                        <Link to='/contact' style={{ fontSize: '30px', textDecoration: 'none' }} > Contact</Link>
                        <Link to='/portfolio' style={{ fontSize: '30px', textDecoration: 'none' }} > Portfolio</Link >
                        <Link to='/' > Back to Home</Link >
                    </nav >
                    {/* </>) : (<>

                    </>)
                } */}
                </Drawer>
            </Box>
        </Box>
    </>)
}