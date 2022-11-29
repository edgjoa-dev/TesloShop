import { GetServerSideProps, NextPage } from 'next';
import { getSession } from "next-auth/react";
import NextLink from 'next/link';
import { PayPalButtons } from "@paypal/react-paypal-js";

import { ShopLayout } from "../../components/layout"
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

import { CartList, OrderSummary } from '../../components/cart';
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({order}) => {

const { shippingAddress } = order;

const onOrdersComplete = (datils) => {
    
};

return (
    <ShopLayout title='Resumen de la compra' pageDescription='Resumen de la compra'>
        <Typography variant='h1' component='h1'># Orden: { order._id }</Typography>

        {
            order.isPaid
            ?(
                <Chip
                    sx={{ my: 2 }}
                    label='Pagado'
                    variant='outlined'
                    color='success'
                    icon={ <CreditScoreOutlined /> }
                />

            )
            :(

                <Chip
                    sx={{ my: 2 }}
                    label='Pendiente de Pago'
                    variant='outlined'
                    color='error'
                    icon={ <CreditCardOffOutlined /> }
                />
            )
        }


        <Grid container sx={{mt: 5}}>

            <Grid item  xs={12} sm={7}>
                <CartList products={ order.orderItems }/>
            </Grid>

            <Grid item  xs={12} sm={5}>

                <Card  className='summary-card'>

                <CardContent>
                        <Typography variant='h2'>Resumen de Compra: {order.numberOfItems} { order.numberOfItems > 1 ? 'productos' : 'producto' } </Typography>

                        <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address}</Typography>
                            <Typography>{shippingAddress.city} {shippingAddress.zip}</Typography>
                            <Typography>{shippingAddress.address2}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Resumen de compra</Typography>
                                <NextLink href='/cart' passHref>
                                    <Link>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    tax: order.tax,
                                    total: order.total,
                                }}
                            />

                        <Box  sx={{mt: 3}} display='flex' flexDirection='column'>

                        {
                            order.isPaid
                            ?
                            (
                                <Chip
                                sx={{ my: 2 }}
                                label='Orden Pagada Correctamente'
                                variant='outlined'
                                color='success'
                                icon={ <CreditScoreOutlined /> }
                            />
                            )
                            :
                            (
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: `${order.total}`,
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order!.capture().then((details) => {
                                        console.log(details)
                                        const name = details.payer.name?.given_name;
                                        alert(`Transaction completed by ${name}`);
                                    });
                                }}
                            />
                            )
                        }
                        </Box>

                    </CardContent>

                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
)
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

const { id='' } = query;
const session:any = await getSession({ req })

if(!session) {
    return{
        redirect: {
            destination: `/auth/login?p=/orders/${ id }`,
            permanent: false,
        }
    }
}

const order = await dbOrders.getOrderById(id.toString());

if(!order){
    return{
        redirect: {
            destination: '/orders/history',
            permanent: false,
        }
    }
}
if(order.user !== session.user._id ){
    return{
        redirect: {
            destination: '/orders/history',
            permanent: false,
        }
    }
}

return {
    props: {
        order
    }
}
}

export default OrderPage;