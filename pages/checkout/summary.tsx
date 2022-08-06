import { ShopLayout } from '../../components/layout/ShopLayout';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';


const SummaryPage = () => {
    return (

    <ShopLayout title='Resumen de Compra' pageDescription='Resumen de la compra'>

            <Typography variant='h1' component='h1'>Resumen de Compra</Typography>

            <Grid container>

                <Grid item  xs={12} sm={7}>
                    <CartList editable/>
                </Grid>

                <Grid item  xs={12} sm={5}>

                    <Card  className='summary-card'>

                        <CardContent>
                            <Typography>Order</Typography>
                            <Divider sx={{ my:1 }} />

                                <OrderSummary />

                            <Box  sx={{mt: 3}}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Checkout
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