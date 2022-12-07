import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';

import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

import { CartList, OrderSummary } from '../../../components/cart';
import { dbOrders } from "../../../database";
import { IOrder } from "../../../interfaces";
import { AdminLayout } from '../../../components/layout/AdminLayout';

interface Props {
    order: IOrder;
}


const OrderPage: NextPage<Props> = ({order}) => {

const { shippingAddress } = order;

return (
    <AdminLayout
        title='Resumen de la orden'
        subTitle={`OrdenId: ${ order._id }`}
        icon={<AirplaneTicketOutlined />}
    >

        {
            order.isPaid
            ?
            (
                <Chip
                    sx={{ my: 2 }}
                    label='Pago Éxitoso'
                    variant='outlined'
                    color='success'
                    icon={ <CreditScoreOutlined /> }
                />

            )
            :
            (

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

                    <Box flexDirection='column' >
                        {
                            order.isPaid
                            ? (
                                <Chip
                                sx={{ my: 2 }}
                                label='Orden Pagada Correctamente'
                                variant='outlined'
                                color='success'
                                icon={ <CreditScoreOutlined /> }
                            />
                            ) : (
                                <Chip
                                sx={{ my: 2 }}
                                label='Pendiente de Pago'
                                variant='outlined'
                                color='error'
                                icon={ <CreditCardOffOutlined /> }
                            />
                            )
                        }
                    </Box>

                        </Box>

                    </CardContent>

                </Card>
            </Grid>
        </Grid>
    </AdminLayout>
)
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

const { id='' } = query;

const order = await dbOrders.getOrderById(id.toString());

if(!order){
    return{
        redirect: {
            destination: '/admin/orders',
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