import { Button } from "@mui/material";
import './auth.css'
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import logo from '../../assets/images/logo.jpg'

export default function SignUp() {

    return (
        <div>
            <header className="signup-header">
                < Box className="logo">
                    <img src={logo} alt="logo" height={65} width={100} />
                </Box>
                <Box className="signup-headerLeft">
                    <h1>Welcome to Shop Cart</h1>
                </Box>
            </header>
            <Box className="signUp">
                <div>
                    <form action="" className="signupform">
                        <div className="signup-inputblock">
                            <InputLabel htmlFor='name'>User Name :  </InputLabel>
                            <TextField type="text" id="name" variant="outlined" placeholder="Enter Name" />
                        </div><br />
                        <div className="signup-inputblock">
                            <InputLabel htmlFor="email">Email:</InputLabel>
                            <TextField type="email"
                                id="email"
                                variant="outlined"
                                placeholder="Enter email" />
                        </div><br />
                        <div className="signup-inputblock">
                            <InputLabel htmlFor="password">Password:</InputLabel>
                            <TextField type="password"
                                id="password"
                                variant="outlined"
                                placeholder="Enter password" />
                        </div><br />
                        <div className="signup-inputblock">
                            <InputLabel htmlFor="confirmPassword">Confirm Password:</InputLabel>
                            <TextField type="confirmPassword"
                                id="confirmPassword"
                                variant="outlined"
                                placeholder="Confirm Password" />
                        </div><br />
                        <div className="signup-inputblock">
                            <InputLabel htmlFor="mobile">Mobile Number: </InputLabel>
                            <TextField type="text"
                                id="mobile"
                                variant="outlined"
                                placeholder="Enter Mobile number"
                            />
                        </div><br />
                        <div className="signup-inputblock">
                            <InputLabel htmlFor="profession">Profession:</InputLabel>
                            <TextField type="text"
                                id="profession"
                                variant="outlined"
                                placeholder="Enter profession"
                            />
                        </div><br />
                        <div className="signup-inputblock">
                            <InputLabel htmlFor="name">Message:</InputLabel>
                            <textarea name="message" id="message" cols={30} rows={10}></textarea>
                        </div><br />
                        <div className="signup-btn">
                            <Button variant="contained">Sign Up</Button>
                            {/* <Button variant="contained">Cancel</Button><br /> */}
                        </div>
                    </form>
                </div>
            </Box>
        </div>
    )
}