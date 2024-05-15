import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function AppDrawer() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    return (<>
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

function useState(arg0: boolean): [any, any] {
    throw new Error("Function not implemented.");
}
