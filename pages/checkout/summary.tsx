import { ShopLayout } from '../../components/layout/ShopLayout';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import NextLink from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../../context';


const SummaryPage = () => {

    const { shippingAddress, numberOfItems } = useContext(CartContext)
    if(!shippingAddress){
        return <></>;
    }
    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;

    return (
    <ShopLayout title='Resumen de Compra' pageDescription='Resumen de la compra'>

            <Typography variant='h1' component='h1'>Resumen de Compra</Typography>

            <Grid container sx={{mt: 5}}>

                <Grid item  xs={12} sm={7}>
                    <CartList editable={false} />
                </Grid>

                <Grid item  xs={12} sm={5}>

                    <Card  className='summary-card'>

                        <CardContent>
                            <Typography variant='h2'>Resumen de Compra: ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'} )</Typography>
                            <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                    <NextLink href='/checkout/address' passHref>
                                        <Link>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>

                                <Typography>{firstName} {lastName}</Typography>
                                <Typography>{address}, {address2}</Typography>
                                <Typography>{city}, {zip}, {country}</Typography>
                                <Typography>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />
                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant='subtitle1'>Resumen de compra</Typography>
                                    <NextLink href='/cart' passHref>
                                        <Link>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>
                                <OrderSummary />

                            <Box  sx={{mt: 3}}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirmar Compra
                                </Button>
                            </Box>
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage