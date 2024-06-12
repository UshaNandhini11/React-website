import { ChangeEvent, useState } from 'react';
import './auth.css'
import { Button, Checkbox, FormControlLabel, InputLabel, TextField } from "@mui/material";
import { login } from '../../service/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('oliviaw') //emilys
    const [password, setPassword] = useState<string>('oliviawpass')// emilyspass

    const handleNameInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUserName(event.target.value)
    }

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPassword(event.target.value)
    }
    const handleSubmitForm = async () => {
        if (!userName) {
            alert("Please enter username")
        }
        if (!password) {
            alert("Please enter password")
        }
        try {
            let response = await login(userName, password)
            localStorage.setItem('token', response.token)
            // console.log(localStorage.getItem('token'))
            navigate('/')
        } catch (error) {
            alert(error)
        }
    }
    return (<>
        <div className="login">
            <form className='loginForm'>
                <div>
                    <h1>LOGIN</h1>
                </div>
                <TextField id="userName"
                    className='signup-inputblock'
                    label="User Name"
                    variant="outlined"
                    placeholder="Enter User Name"
                    value={userName}
                    onChange={(event) => { handleNameInput(event) }}>
                </TextField>
                <br />
                <TextField
                    className='signup-inputblock'
                    id="password"
                    type='password'
                    label="Password"
                    variant="outlined"
                    placeholder="Enter password"
                    value={userName}
                    onChange={(event) => { handlePasswordInput(event) }}>
                </TextField>
                <br />
                <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Remember Me"
                    labelPlacement="end"
                    className="fonts" />
                <br />
                <Button variant="contained" onClick={() => handleSubmitForm()}>Log in</Button> <br />
                <InputLabel className="label fonts" htmlFor='signup'>To create an account,
                    <a className="link" href="/signup"> Sign up</a>
                </InputLabel>
            </form>
        </div>
    </>)
}

