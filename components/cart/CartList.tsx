import { FC, useContext } from 'react';
import NextLink from 'next/link';
<<<<<<< HEAD
import { Box, Button, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { FC } from 'react';
=======
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
>>>>>>> f7ae69cd30712e90ca09dfa9a68975c191c225b9

import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';


interface Props {
    editable?: boolean;
    products?: []
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

    const productsToShow = products ? products : cart;


    return (
        <>
            {
                productsToShow.map( product => (
                    <Grid container spacing={2} key={ product.slug + product.size } sx={{ mb:1 }}>
                        <Grid item xs={3}>
                            {/* TODO: llevar a la página del producto */}
                            <NextLink href={`/product/${ product.slug }`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={ product.image }
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{ product.title }</Typography>
                                <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography>

<<<<<<< HEAD
                        <Grid item xs={7} sm={7}>
                            <Box display='flex' flexDirection='column' >
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body1">Talla: <strong>--</strong></Typography>
                                {/* Condicional */}
                                {
                                    editable
                                    ? <ItemCounter
                                        currentValue={0}
                                        maxValue={0}
                                        updatedQuantity={()=> {}}
                                    />
                                    : <Typography variant="h6"> 3 </Typography>
=======
                                {
                                    editable 
                                    ? (
                                        <ItemCounter 
                                            currentValue={ product.quantity }
                                            maxValue={ 10 } 
                                            updatedQuantity={ ( value ) => onNewCartQuantityValue(product as ICartProduct, value )}
                                        />
                                    )
                                    : (
                                        <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Typography>
                                    )
>>>>>>> f7ae69cd30712e90ca09dfa9a68975c191c225b9
                                }

                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>

                            {
                                editable && (
                                    <Button 
                                        variant='text' 
                                        color='secondary' 
                                        onClick={ () => removeCartProduct( product as ICartProduct ) }
                                    >
                                        Remover
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}