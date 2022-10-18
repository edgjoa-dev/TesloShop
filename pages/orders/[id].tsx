import { ShopLayout } from "../../components/layout"
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import NextLink from 'next/link';
import { CreditScoreOutlined } from "@mui/icons-material";
import { GetServerSideProps, NextPage } from 'next';


const OrderPage: NextPage = (props) => {

    console.log({props})
    return (
        <ShopLayout title='Resumen de la compra' pageDescription='Resumen de la compra'>
            <Typography variant='h1' component='h1'>Compra: ABC123456-A</Typography>

            {/* <Chip
                sx={{ my: 2 }}
                label='Pendiente de Pago'
                variant='outlined'
                color='error'
                icon={ <CreditCardOffOutlined /> }
            /> */}

            <Chip
                sx={{ my: 2 }}
                label='Pagado'
                variant='outlined'
                color='success'
                icon={ <CreditScoreOutlined /> }
            />

            <Grid container sx={{mt: 5}}>

                <Grid item  xs={12} sm={7}>
                    <CartList editable={false} />
                </Grid>

                <Grid item  xs={12} sm={5}>

                    <Card  className='summary-card'>

                    <CardContent>
                            <Typography variant='h2'>Resumen de Compra:  3 productos</Typography>

                            <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                    <NextLink href='/checkout/address' passHref>
                                        <Link>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>

                                <Typography>Edgar Joaquin Flores</Typography>
                                <Typography>Villahermosa #10</Typography>
                                <Typography>Chalco, Edo. de Méx</Typography>
                                <Typography>+52 5530921195</Typography>

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
                                <h1>Pagar</h1>
                            </Box>
                            <Chip
                                sx={{ my: 2 }}
                                label='Orden Pagada Correctamente'
                                variant='outlined'
                                color='success'
                                icon={ <CreditScoreOutlined /> }
                            />

                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id='' } = query;

    return {
        props: {
            id
        }
    }
}

export default OrderPage;