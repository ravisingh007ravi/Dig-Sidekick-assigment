import { useState } from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Container = styled(Box)`
    margin: 300px;
    text-align: center;
`;

const Heading = styled(Typography)`
    font-size: 30px;
    color:#878787;
`;

const DeleteButton = styled(Button)`

    margin:30px;
`;

const HomeButton = styled(Button)`
    background-color: rgb(179, 36, 18);
`;

function DeletedPost() {

  const navigate = useNavigate();

  const { id } = useParams();

  

  const [post, setPost] = useState({authorId: `${localStorage.getItem("UserId")}`})

 
   console.log(setPost);
  
  
  const submitPostDataBase = async (e) => {

    e.preventDefault();

    const url = `http://localhost:8000/blogs/${id}`;

    try {

      let postData = await axios.delete(url, post
    //     , {
    //     headers: {
    //         "x-api-key": `${localStorage.getItem("AcessToken")}`
    //     }
    // }
    )
      if (postData.status === false) window.alert("invalid data");

      else { navigate('/'); }

    }
    catch (err) { window.alert(err.response.data.msg); }
  }
  


  return (
    <Container>
      <Heading>Are You Serious to Delete this Post</Heading>
      <Link to='/' style={{ textDecoration: 'none' }}><DeleteButton variant="contained">Home</DeleteButton></Link>
      <Link to='/' style={{ textDecoration: 'none' }} onClick={submitPostDataBase}><HomeButton variant="contained">Delete</HomeButton></Link>
    </Container>
  )
}

export default DeletedPost

