import { Box, styled } from '@mui/material';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Grid } from '@mui/material';
import HomeBanner from '../images/toy-bricks-table-with-word-blog.jpg';
import { categories } from './HomeCategorieData';
import { Link, useSearchParams } from 'react-router-dom';
import { Post } from './AllComponents';



const ImageBanner = styled('img')({
    width: '100%',
    height: '40vh',
    objectFit: 'cover'
});

const Image = styled(Box)`
    margin-top: 25px;
   
    width:100%;
    height: 40vh;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
`;

const StyleTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const Stylebutton = styled(Button)`
    margin:20px;
    width:85%;
    background:#6495Ed;
    color:#ffff;
`;

const StyleLink = styled(Link)({

    textDecoration: 'none',
    color: 'inherit'
})



function Banner() {

    const [serachParams] = useSearchParams();
    const category = serachParams.get('category')



    return (
        <>
            <Image>
                <ImageBanner src={HomeBanner} alt="BannerImage" />
            </Image>

            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>

                    <StyleLink to={`/create?category=${category || 'all'}`}>
                        <Stylebutton variant="contained">Create Blog</Stylebutton>
                    </StyleLink>
                    <StyleTable>
                        <TableHead>
                            <TableRow>
                                <TableCell><StyleLink to='/'>All Categories</StyleLink></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <StyleLink to={`/?category=${category.type}`}> {category.type} </StyleLink>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyleTable>
                </Grid>

                <Grid container item xs={12} sm={10} xl={10}>
                    <Post />
                </Grid>
            </Grid>
        </>
    )
}

export default Banner
