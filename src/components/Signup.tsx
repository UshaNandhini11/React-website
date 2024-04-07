import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div>
            <header className="header">
                <Box className="headerLeft">
                    <h1>Welcome to our Product</h1>
                </Box>
                <Box className="headerLeft">
                    <Button variant='contained' onClick={() => {
                        handleLogout()
                    }}>Logout</Button>
                </Box>
            </header>
            <Box className="signUp">
                <div>
                    <form action="" className="signupform">
                        <div className="inputblock">
                            <InputLabel htmlFor='name'>User Name :  </InputLabel>
                            <TextField type="text" id="name" variant="outlined" placeholder="Enter Name" />
                        </div><br />
                        <div className="inputblock">
                            <InputLabel htmlFor="email">Email:</InputLabel>
                            <TextField type="email"
                                id="email"
                                variant="outlined"
                                placeholder="Enter email" />
                        </div><br />
                        <div className="inputblock">
                            <InputLabel htmlFor="password">Password:</InputLabel>
                            <TextField type="password"
                                id="password"
                                variant="outlined"
                                placeholder="Enter password" />
                        </div><br />
                        <div className="inputblock">
                            <InputLabel htmlFor="confirmPassword">Confirm Password:</InputLabel>
                            <TextField type="confirmPassword"
                                id="confirmPassword"
                                variant="outlined"
                                placeholder="Confirm Password" />
                        </div><br />
                        <div className="inputblock">
                            <InputLabel htmlFor="mobile">Mobile Number: </InputLabel>
                            <TextField type="text"
                                id="mobile"
                                variant="outlined"
                                placeholder="Enter Mobile number"
                            />
                        </div><br />
                        <div className="inputblock">
                            <InputLabel htmlFor="profession">Profession:</InputLabel>
                            <TextField type="text"
                                id="profession"
                                variant="outlined"
                                placeholder="Enter profession"
                            />
                        </div><br />
                        <div className="inputblock">
                            <InputLabel htmlFor="name">Message:</InputLabel>
                            <textarea name="message" id="message" cols={30} rows={10}></textarea>
                        </div><br />
                        <div className="btn">
                            <Button variant="contained">Sign Up</Button>
                            {/* <Button variant="contained">Cancel</Button><br /> */}
                        </div>
                    </form>
                </div>
            </Box>
        </div>
    )
}