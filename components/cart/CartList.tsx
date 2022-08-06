import { ItemCounter } from '../ui';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { FC } from 'react';


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean;
}

export const CartList:FC<Props> = ({editable = false}) => {

    return (
                productsInCart.map(product => (
                    <Grid container spacing={2} key={product.slug}>
                        <Grid item xs={3} sm={3}>
                            <NextLink  href="/product/slug" passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${ product.images[0] }`}
                                            component="img"
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={7} sm={7}>
                            <Box display='flex' flexDirection='column' >
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body1">Talla: <strong>M</strong></Typography>
                                {/* Condicional */}
                                {
                                    editable
                                    ? <ItemCounter />
                                    : <Typography variant="h6"> 3 </Typography>
                                }
                            </Box>
                        </Grid>

                        <Grid item xs={2} sm={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant="subtitle1">${product.price}</Typography>
                            {/* Editable */}
                            {
                                editable && (
                                    <Button variant='text' color='error'>
                                        Remover
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            )
}

