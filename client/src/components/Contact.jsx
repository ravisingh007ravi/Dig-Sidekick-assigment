import { Box, Input, TextField, Button, styled } from '@mui/material';
import {Link} from 'react-router-dom';

const Container = styled('form')({
margin:  '200px 50px 0 50px'
});

const InputBox = styled(Input)`
background-color: rgb(87, 87, 85);
color:white;
padding:5px;
border-radius: 5px;
border: 1px solid rgb(46, 46, 123);
margin : 10px;
width: 100%;
`;

const Message = styled(TextField)`
margin : 10px;
width: 100%;
height: 90%;
`;

const ButtonStyle = styled(Button)`
margin : 10px;
width: 100%;
`;

function Contact() {
  return (
    <Container >

      <Box>
        <InputBox type="text" name="name" placeholder='Enter Name' />
        <InputBox type="text" name="emailId" placeholder='Enter EmailId' />
        <InputBox type="text" name="PhoneNo" placeholder='Enter Phone No.' />
      </Box>
      <Box>
        <Message name="message" id="msg" cols="30" rows="10" placeholder='Message'></Message>
      </Box>
      <Link to ='/' style={{textDecoration:"none"}} >
      <ButtonStyle  variant="contained" >Summit</ButtonStyle >
      </Link>

    </Container>
  )
}

export default Contact
