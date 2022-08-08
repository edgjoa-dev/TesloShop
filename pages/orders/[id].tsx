import { ShopLayout } from "../../components/layout"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import NextLink from 'next/link';

const [id] = () => {
    return (
        <ShopLayout title='Resumen de Compra' pageDescription='Resumen de la compra'>
            <Typography variant='h1' component='h1'>Resumen de Compra</Typography>

            <Grid container sx={{mt: 5}}>

                <Grid item  xs={12} sm={7}>
                    <CartList />
                </Grid>

                <Grid item  xs={12} sm={5}>

                    <Card  className='summary-card'>



                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default [id]