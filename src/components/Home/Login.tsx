import { ChangeEvent, FormEvent, useState } from 'react';
import './header.css'
import { Button, Checkbox, FormControlLabel, InputLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export interface User {
    id: number,
    username: string,
    email: string,
    token: string
}
export default function Login() {
    const navigate = useNavigate()
    const [IsInputChanged, setIsInputChanged] = useState<boolean>(false)
    const [emailInput, setEmailInput] = useState<string>()
    const [pwdInput, setPwdInput] = useState<string>()
    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    })
    const [userData, setUserData] = useState<User[] | []>([])

    const handleSubmitForm = () => {
        navigate('/home')
    }
    const handleInputchange = () => {
        setIsInputChanged(true)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value
        });
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userData = {
            userName: formData.userName,
            password: formData.password
        };
        const getUserData = () => {
            try {
                axios.post("https://dummyjson.com/auth/login", userData).then((response) => {
                    console.log(response.status, response.data);
                    setUserData(response.data)
                });
            } catch (error) {
            }
        }

    };
    return (<>
        <div className="loginForm">
            <form className='reactForm'
                // onSubmit={() => handleSubmitForm()}
                onSubmit={(event) => { handleSubmit(event) }}>

                <InputLabel className="label fonts" htmlFor='userName'>UserName : </InputLabel>
                <input type="text" name="userName" id="userName" className="label inputTextBox fonts"
                    // onChange={() => { handleInputchange() }} 
                    value={emailInput}
                    onChange={(event) => { handleChange(event) }} /><br />

                <InputLabel className="label" htmlFor='password'>Password : </InputLabel>
                <input type="password" name="password" id="password" className="label inputTextBox"
                    // onChange={() => { handleInputchange() }}
                    value={pwdInput}
                    onChange={(event) => { handleChange(event) }} />
                <br />
                <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Remember Me"
                    labelPlacement="end"
                    className="fonts" />
                <Button variant="contained" type='submit'
                // onClick={() => { if (IsInputChanged) { navigate('/home') } }}
                >Log in</Button><br />
                <InputLabel className="label fonts" htmlFor='signup'>To create a account,  <a className="link" href="/signup"> Register here</a></InputLabel>
            </form>
        </div>
        {/* </Container> */}
    </>)
}

