import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from '../images/blogger.png';
import { Box, TextField, Button, styled } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import { DataContext } from './DataProvider';



const Components = styled(Box)`
    border-radius: 14px;
    background-color:white;
    width:400px;
    margin:auto;
    margin-top: 120px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6)
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    paddingTop: '50px'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform:none;
    background:#FB641B;
`

const SignButton = styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0;
    box-shadow: 0px 2px 4px 0px rgb(0 0 0/ 20%)
`
const SignUpLink = styled(Link)({
    color: '#2874f0',
    textTransform: 'none',
    textDecoration: 'none'
})



function LogIn({isUserAuthentication}) {

    const navigate = useNavigate();
    const [logInData, seTLogInData] = useState({ email: '', password: '' })

    const changeLogInData = (e) => {
        e.preventDefault()
        seTLogInData({ ...logInData, [e.target.name]: e.target.value })
    }
    
    // const{setAccount} = useContext(DataContext)

    const submitLogInDataBase = async (e) => {
        e.preventDefault()
        try {
            const url ='http://localhost:8000/login';
            
            let logInUser = await axios.post(url, logInData)
            // let name = logInUser.data.loggedAuthor.name;
            // let email =logInUser.data.loggedAuthor.email;
            
            let token = logInUser.data.token;
            let UserId = logInUser.data.UserId;
            if (logInUser.status === false) window.alert("invalid data");

            else {
                localStorage.setItem('AcessToken',token);
                localStorage.setItem('UserId',UserId);
                // setAccount({email:email,name:name});
                isUserAuthentication(true);
                navigate('/');
            }
        }
        catch (err) { window.alert(err.response) }
    }

    return (
        <Components>
            <Box>
                <Image src={Logo} alt="LogoSignUp"/>
                <Wrapper>
                    <TextField name='email' onChange={changeLogInData}  label= "Enter EmailId" variant="standard" />
                    <TextField className='abc' name='password' type="password" onChange={changeLogInData} label="Enter Password" variant="standard" />
                    <LoginButton onClick={submitLogInDataBase} variant="contained" >LogIn</LoginButton>
                    <SignButton ><SignUpLink to='/SignUp'>CREATE AN ACCOUNT</SignUpLink></SignButton>
                </Wrapper>
            </Box>
        </Components>
    )
}

export default LogIn

