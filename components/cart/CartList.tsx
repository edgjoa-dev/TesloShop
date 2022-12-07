import {  FC, useContext } from 'react';
import NextLink from 'next/link';

import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';

import { ItemCounter } from '../ui';
import { Box, Button, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';

interface Props  {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartList: React.FC<Props> = ({ editable= false, products })=> {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

    const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

    const productsToShow = products ? products : cart;

    return (
        <>
        {
            productsToShow.map(product => (
        <Grid container spacing={2} key={product.slug + product.size} sx={{mb:1}}>
            <Grid item xs={3} sm={3}>
                <NextLink  href={`/product/${product.slug}`} passHref>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                image={product.image}
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
                    <Typography variant="body1">Talla: <strong> {product.size} </strong></Typography>
                    {/* Condicional */}
                    {
                        editable
                        ? <ItemCounter
                            currentValue={product.quantity}
                            maxValue={ 10 }
                            updatedQuantity={(value) => onNewCartQuantityValue(product as ICartProduct, value)}
                        />
                        : <Typography variant="h6"> {product.quantity}{product.quantity > 1 ? 'productos' : 'producto'} </Typography>
                    }
                </Box>
            </Grid>

            <Grid item xs={2} sm={2} display='flex' alignItems='center' flexDirection='column'>
                <Typography variant="subtitle1">${product.price}</Typography>
                {/* Editable */}
                {
                    editable && (
                        <Button
                            variant='text'
                            color='error'
                            onClick={() => removeCartProduct(product as ICartProduct) }
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

