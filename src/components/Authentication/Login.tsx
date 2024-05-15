import { ChangeEvent, useState } from 'react';
import './../Home/css/header.css'
import { Button, Checkbox, FormControlLabel, InputLabel } from "@mui/material";
import { login } from '../../service/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('kminchelle')
    const [password, setPassword] = useState<string>('0lelplR')

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
        <div className="loginForm">
            <form className='reactForm'>
                <InputLabel className="label" htmlFor='userName'>UserName : </InputLabel>
                <input type="text"
                    id="userName"
                    className="label inputTextBox fonts"
                    value={userName}
                    onChange={(event) => { handleNameInput(event) }} /><br />
                <InputLabel className="label" htmlFor='password'>Password : </InputLabel>
                <input type="password"
                    id="password"
                    className="label inputTextBox"
                    value={password}
                    onChange={(event) => { handlePasswordInput(event) }} />
                <br />
                <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Remember Me"
                    labelPlacement="end"
                    className="fonts" />
                <Button
                    variant="contained"
                    onClick={() => handleSubmitForm()}>
                    Log in</Button><br />
                <InputLabel className="label fonts" htmlFor='signup'>To create a account,
                    <a className="link" href="/signup"> Register here</a></InputLabel>
            </form>
        </div>
    </>)
}

