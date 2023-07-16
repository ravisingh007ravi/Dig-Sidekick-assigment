import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Delete, Edit } from '@mui/icons-material';
import { DataContext } from './DataProvider';
import { Link } from 'react-router-dom';

const Container = styled(Box)`
      margin: 60px 100px;
`;

const Image = styled('img')({
  width: '100%',
  height: '60vh',
  objectFit: 'cover'
});

const Heading = styled(Typography)`
      font-size: 30px;
      font-weight: 600;
      text-align: center;
     margin: 50px 0 10px 0;
`;

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Author = styled(Box)`
color:#878787;
margin: 20px;
display:flex;
`;


function DetailsViewPost() {
  const { id } = useParams()

  const { account } = useContext(DataContext);

  const [post, setPost] = useState({});

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

  return (
    <Container>
      <Image src={post.picture} alt="IdPicture" />

      <Box style={{ float: 'right' }}>
        {
          account.userName === post.userName &&
          <><Link to ={`/UpdateBlogs/${id}`}><EditIcon color='primary' /></Link>
           <Link to = {`/DeletedPost/${id}`}><DeleteIcon color='error' /></Link>
          </>
        }
      </Box>

      <Heading>{post.title}</Heading>

      <Author>
        <Typography>Author:- <Box component="span" style={{ fontWeight: 600 }}>{post.userName}</Box></Typography>
        <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createDate).toString().slice(0, 15).replace(/-/g, "")}</Typography>
      </Author>

      <Typography>{post.description}</Typography>
    </Container>
  )
}

export default DetailsViewPost
