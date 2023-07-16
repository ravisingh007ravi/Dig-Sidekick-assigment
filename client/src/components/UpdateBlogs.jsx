import React, { useState, useContext,useEffect } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useParams } from 'react-router-dom';
import { DataContext } from './DataProvider';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const Container = styled(Box)`
    margin: 60px 50px;
`;

const StyleFormControl = styled(FormControl)`

    margin-top:10px;
    display:flex;
    flex-direction:row;
`;

const StyleInput = styled(InputBase)`
    flex:1;
    width: 95%;
    margin: 0 10px;
    font-size:25px
`;

const StyleTextArea = styled(TextareaAutosize)`
    width:100%;
    margin-top : 20px;
    font-size:18px;
    border:none;
    &:focus-visible{
        outline:none;
    }
`;


function UpdateBlogs() {

    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {

        try {
          const blogDataById = async () => {
            const url = `http://localhost:8000/blogs/${id}`;
    
            const data = await axios.get(url, {
              headers: {
                "x-api-key": `${localStorage.getItem("AcessToken")}`
              }
            })
            setPost(data.data.msg[0])
          }
          blogDataById();
        }
        catch (err) { window.alert(err.response.data.msg); }
    
      }, [id]);



    const [post, setPost] = useState({
        title: '',
        description: '',
        authorId: `${localStorage.getItem("UserId")}`,
        picture: '',
        userName: '',
        categories: '',
        createDate: new Date()
    })
    

    const submitPostDataBase = async (e) => {

        e.preventDefault();

        const url = `http://localhost:8000/blogs/${id}`;
        
        try {

            let postData = await axios.put(url, post, {
                headers: {
                    "x-api-key": `${localStorage.getItem("AcessToken")}`
                }
            })
            if (postData.status === false) window.alert("invalid data");
            
            else { navigate('/'); }

        }
        catch (err) { window.alert(err.response.data.msg); }
    }



    const { account } = useContext(DataContext);
    const location = useLocation();

    post.categories = location.search?.split('=')[1] || 'All';
    post.userName = account.userName;

    const ControlledData = (e) => { setPost({ ...post, [e.target.name]: e.target.value }) }

    return (
        <Container>
            <Image src={post.picture} alt="banner" />
            <StyleInput placeholder='Enter Image URL' name='picture' value={post.picture} onChange={ControlledData}></StyleInput>
            <StyleFormControl>

                <label htmlFor='fileInput'><AddCircleIcon fontSize='large' color='action' /></label>

                <input type="file" id='fileInput' style={{ display: 'none' }} />

                <StyleInput placeholder='Title' value={post.title} name='title' onChange={ControlledData} />

                <Button variant='contained' onClick={submitPostDataBase}>Publish</Button>

            </StyleFormControl>
            <StyleTextArea minRows={5} value={post.description} placeholder='Tell you Story....'
                name='description' onChange={ControlledData}/>
        </Container>
    )
}




export default UpdateBlogs

