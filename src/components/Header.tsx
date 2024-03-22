import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useState } from "react"
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleHamburgerIcon = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (<>
        <Container>
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
                    <h1>Home Page</h1>
                </Box>

            </Box>
            <Box >
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {/* {
                    isMenuOpen ? (<> */}
                    <nav className="navigation">
                        <Link to='/about' style={{ fontSize: '30px', textDecoration: 'none' }} > About</Link>
                        <Link to='/contact' style={{ fontSize: '30px', textDecoration: 'none' }}> Contact</Link>
                        <Link to='/portfolio' style={{ fontSize: '30px', textDecoration: 'none' }}> Portfolio</Link >
                        <Link to='/' > Back to Home</Link >
                    </nav >
                    {/* </>) : (<>

                    </>)
                } */}
                </Drawer>
            </Box>

        </Container>
    </>)
}

