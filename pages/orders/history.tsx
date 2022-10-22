import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layout/ShopLayout';
import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';


    const columns: GridColDef[] = [
        { field: 'id',        headerName: 'ID',              width: 100 },
        { field: 'fullName',  headerName: 'Nombre Completo', width: 300 },
        {
            field: 'paid',
            headerName: 'Pagada',
            description: 'Muestra status de orden pagada o no',
            width: 200,
            renderCell: ( params: GridValueGetterParams ) => {
                return (
                    params.row.paid
                    ? <Chip color="success" label="Pagada" variant='outlined'/>
                    : <Chip color="error" label="No Pagada" variant='outlined'/>
                )
            }
        },
        {
            field: 'orden',
            headerName: 'Ver Orden',
            width: 200,
            sortable: false,
            renderCell: ( params: GridValueGetterParams ) => {
                return (
                    <NextLink href={`/orders/${params.row.orderId}`} passHref>
                        <Link underline='hover'>
                            Ver Orden
                        </Link>
                    </NextLink>
                )
            }
        }
    ];


    interface Props {
        orders: IOrder[]
    }

    const HistoryPage: NextPage<Props> = ({orders}) => {

        console.log({ orders })
    const  rows = orders.map((order, idx)=>({
        id: idx + 1 ,
        paid: order.isPaid,
        fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        orderId: order._id,
    }))

    return (
        <ShopLayout title='Historial de ordenes' pageDescription='Historial de las ordenes del cliente'>
            <Typography variant='h1' component='h1'> Historial de Ordenes </Typography>

            <Grid container>
                <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                    <DataGrid
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={[ 10 ]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session:any = await getSession({ req })

    if(!session){
        return {
            redirect: {
                destination: 'auth/login?p=/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrderByUserId(session.user._id);

    return {
        props: {
            orders
        }
    }
}


export default HistoryPage