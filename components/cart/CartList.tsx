import { Box, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import NextLink from 'next/link';


const productsInCart= [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
    initialData.products[4],
]

export const CartList = () => {

    return (
                productsInCart.map(product => (
                    <Grid container spacing={2} key={product.slug}>
                        <Grid item xs={3} sm={3}>
                            <NextLink  href="/product/slug" passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`products/${ product.images[0] }`}
                                            component="img"
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7} sm={7}>

                        </Grid>
                        <Grid item xs={2} sm={2}>

                        </Grid>
                    </Grid>
                ))
            )
}

