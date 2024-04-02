import { useState } from 'react';
import './header.css'
import { Button, Checkbox, FormControlLabel, InputLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    const [isInputChanged, setIsInputChanged] = useState<boolean>(false)

    const handleSubmitForm = () => {
        if (isInputChanged) {
            navigate('/home')
        }
    }
    const handleInputchange = () => {
        setIsInputChanged(true)
    }
    return (<>
        <div className="loginForm">
            <form className='reactForm'
                onSubmit={() => handleSubmitForm()}>

                <InputLabel className="label fonts" htmlFor='userName'>UserName : </InputLabel>
                <input type="text" name="userName" id="userName" className="label inputTextBox fonts"
                    onChange={() => { handleInputchange() }} /><br />

                <InputLabel className="label" htmlFor='password'>Password : </InputLabel>
                <input type="password" name="password" id="password" className="label inputTextBox"
                    onChange={() => { handleInputchange() }} />
                <br />
                <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Remember Me"
                    labelPlacement="end"
                    className="fonts" />
                <Button variant="contained" type='submit'> Log in</Button><br />
                <InputLabel className="label fonts" htmlFor='signup'>To create a account,  <a className="link" href="/signup"> Register here</a></InputLabel>
            </form>
        </div>
    </>)
}

