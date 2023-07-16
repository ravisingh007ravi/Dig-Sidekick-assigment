import { Box, Typography, Grid, styled, Button } from '@mui/material';
import { Facebook, Instagram, GitHub, LinkedIn, CoPresentSharp } from '@mui/icons-material';
import Ravi from '../images/ravi.jpg';
import { Link } from 'react-router-dom';

const ContainerMain = styled(Grid)`
    margin: 100px 100px 0 0;
`;

const Images = styled('img')({
  textAlign:'center',
  marginTop:'50px',
  borderRadius: '20px',
  marginLeft: '50px',
  height: '550px',
    width: '500px'
});

const Header = styled(Typography)`
    font-size: 55px;
    font-weight: 600;
    text-align: center;
`;

const SubHeader = styled(Typography)`
    text-align: center;
    color: #878787;
    font-size: 35px;
    margin-top: 20px;
`;

const BioData = styled(Typography)`
    text-align: center;
    font-size: 25px;
    margin-top: 50px;
`;

const HomeButton = styled(Link)({
  marginLeft: '360px'
});

const IconStyle = styled(Box)`
text-align: center;
margin-top:20px;
`;

const FacebookStyle = styled(Facebook)`
height: 50px;
width: 50px;
color:#3b5998;
padding:10px;
`;

const InstagramStyle = styled(Instagram)`
height: 50px;
width: 50px;
color:#d62976;
padding:10px;
`;

const GitHubStyle = styled(GitHub)`
height: 50px;
width: 50px;
color:#4078c0;
padding:10px;
`;

const LinkedInStyle = styled(LinkedIn)`
height: 50px;
width: 50px;
color:#0072b1;
padding:10px;
`;

const CoPresentSharpStyle = styled(CoPresentSharp)`
height: 50px;
width: 50px;
color:#3b5998;
padding:10px;
`;

function About() {
  return (
    <ContainerMain container>

      <Grid item lg={5} sm={10} xs={12}>
        <Images src={Ravi} alt="me" />
      </Grid>

      <Grid item lg={6} sm={10} xs={12}>
        <Header>About Us</Header>
        <SubHeader>MERN Developer</SubHeader>
        <IconStyle>
          <Link to='https://www.facebook.com/profile.php?id=100007642129369'><FacebookStyle /></Link>

          <Link to='https://www.instagram.com/ravi_singh_thakur_78/'><InstagramStyle /></Link>

          <Link to='https://github.com/ravisingh007ravi'><GitHubStyle /></Link>

          <Link to='https://www.linkedin.com/in/ravi-singh-763378182'><LinkedInStyle /></Link>

          <Link to='https://comforting-bienenstitch-487890.netlify.app/'><CoPresentSharpStyle /></Link>
        </IconStyle>
        <BioData>Trained in Backend Development using Nodes with ReactJs, Express and MongoDB
          Proficient in JavaScript. Hands-on in ES6
          Understand caching fundamentals and hands-on with Redis
          Hands-on experience with AWS S3 file upload and read Experienced in Agile methodology - Daily scrum, Sprint planning. Sprint review.
          Participated in FunctionUp Coding competitions on HackerRank and LeetCode</BioData>
        <HomeButton to='/' style={{ textDecoration: 'none', textAlign: 'center' }}>
          <Button variant="outlined">HOME</Button>
        </HomeButton>
      </Grid>

    </ContainerMain>
  )
}

export default About 
