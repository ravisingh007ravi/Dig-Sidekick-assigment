import React from 'react';
import { AppBar, Toolbar, styled } from '@mui/material';
import {Link} from 'react-router-dom';


const Component = styled(AppBar)`
        background:#ffffff;
        color:#000
`
const Container = styled(Toolbar)`
        justify-content: center;
        & > a{
            padding:20px;
            text-decoration: none;
            color:#000;
        }
`

function Navbar() {
    return (
        <Component>
            <Container>
                <Link to  ='/'> Home</Link>
                <Link to  ='/About'> About</Link>
                <Link to  ='/Contact'> Contact</Link>
                <Link to  ='/LogIn'> LogOut</Link>
            </Container>
        </Component>
        
    )
}

export default Navbar
