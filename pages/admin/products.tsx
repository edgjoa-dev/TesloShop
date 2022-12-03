import  React  from "react";
import { AdminLayout } from '../../components/layout/AdminLayout';
import {  CategoryOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IProducts } from "../../interfaces";

const columns: GridColDef[] = [
    { field: 'img', headerName: 'Foto' },
    { field: 'title', headerName: 'title', width: 250 },
    { field: 'gender', headerName: 'Género' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Invenatrio' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 },

]


const ProductPage =  () => {

    const { data, error } = useSWR< IProducts[]>('/api/admin/products')

    if( !data && !error ) return(<></>);

    const rows = data!.map( product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes,
    }))


    return (
        <AdminLayout
            title={`Productos ${data?.length}`}
            subTitle={'Mantenimiento de productos'}
            icon={ <CategoryOutlined /> }
        >
        <Grid container className="fadeIn">
            <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                <DataGrid
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={[ 10 ]}
                />
            </Grid>
        </Grid>

        </AdminLayout>
    )
}

export default ProductPage;