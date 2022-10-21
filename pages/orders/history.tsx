import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layout/ShopLayout';
import NextLink from 'next/link';



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
                    <NextLink href={`/orders/${params.row.id}`} passHref>
                        <Link underline='hover'>
                            Ver Orden
                        </Link>
                    </NextLink>
                )
            }
        }
    ];
    const rows = [
        { id: 1,  paid: true,   fullName: 'Edgar Flores' },
        { id: 2,  paid: false,   fullName: 'Joaquin Flores' },
        { id: 3,  paid: false,   fullName: 'Pedro Flores' },
        { id: 4,  paid: true,   fullName: 'Juan Flores' },
        { id: 5,  paid: false,   fullName: 'Melissa Flores' },
        { id: 6,  paid: true,   fullName: 'Arely Flores' },
        { id: 7,  paid: false,   fullName: 'Patricia Flores' },
        { id: 8,  paid: false,   fullName: 'Lourdes Flores' },
        { id: 9,  paid: true,   fullName: 'Ana Flores' },
        { id: 10, paid: false,    fullName: 'Guadalupe Flores' },
        { id: 11, paid: false,    fullName: 'Daniela Flores' },
    ];


const HistoryPage = () => {


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


export default HistoryPage