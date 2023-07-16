import { useState, useEffect } from 'react'
import { Box, Grid, Typography, styled } from '@mui/material';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin:10px;
    height: 350px;
    display: flex;
    align-items: center;
    flex-direction: column;
    & > p{
      padding: 0 5px 5px 5px;
    }
`;

const Images = styled('img')({

  width: '100%',
  borderRadius: '10px 10px 0 0',
  objectFit: 'cover',
  height: 150
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
`;

const TitleText = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const Description = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

function Post() {

  const [post, setPost] = useState([]);

  const [SearchParams] = useSearchParams();

  const category = SearchParams.get('category')

  useEffect(() => {
    try {
      const blogsDataFromDataBase = async () => {

        const url = `http://localhost:8000/allBlogs/${category || 'AllBlogs'}`;

        const data = await axios.get(url, {
          headers: {
            "x-api-key": `${localStorage.getItem("AcessToken")}`
          }
        })

        setPost(data.data.msg)
      }
      blogsDataFromDataBase()
    }
    catch (err) { window.alert(err.response.data.msg); }

  }, [category])

  const Elipis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
  }


  return (


    <>
      {
        post && post.length > 0 ? post.map((value, index) => (
          <Grid item lg={3} sm={4} xs={12} key={index}>
            <Link to={`/DetailsViewPost/${value._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

              <Container >
                <Images src={value.picture} alt="postImage" />

                <Text>{value.categories}</Text>
                <TitleText>{Elipis(value.title, 20)}</TitleText>
                <Text>{value.userName}</Text>
                <Description>{Elipis(value.description, 100)}</Description>
              </Container>
            </Link>

          </Grid>


        )) :
          <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>No Data available to display</Box>
      }
    </>
  )
}

export default Post
