import { Button } from "@mui/material";
import './auth.css'
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

export default function SignUp() {
    return (
        <div className="signUp">
            <form action="/signup" className="signupform">
                <div><h1>SIGN UP</h1></div><br />
                <div className="signup-inputblock">
                    <TextField type="text" id="name" label="User Name" variant="outlined" placeholder="Enter Name" />
                </div><br />
                <div className="signup-inputblock">
                    <TextField type="email"
                        id="email"
                        label="Email"
                        variant="outlined"
                        placeholder="Enter email" />
                </div><br />
                <div className="signup-inputblock">
                    <TextField type="password"
                        id="password"
                        label="Password"
                        variant="outlined"
                        placeholder="Enter password" />
                </div><br />
                <div className="signup-inputblock">
                    <TextField type="confirmPassword"
                        id="confirmPassword"
                        label=" Confirm Password"
                        variant="outlined"
                        placeholder="Confirm Password" />
                </div><br />
                <div className="signup-btn">
                    <Button variant="contained">Sign Up</Button>
                </div><br />
                <InputLabel className="label fonts" htmlFor='signup'>Already have an account,
                    <a className="link" href="/login"> Login</a>
                </InputLabel>
            </form>
        </div>
    )
}