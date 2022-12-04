import  React  from "react";
import useSWR from 'swr';
import NextLink from 'next/link';

import {  AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Grid, CardMedia, Link, Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { AdminLayout } from '../../components/layout/AdminLayout';
import { IProducts } from "../../interfaces";

const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Foto',
        renderCell: ( {row}:GridValueGetterParams  )=>{
            return(
                <a href={ `/product/${row.slug}` } target="_blank" rel="noreferrer">
                    <CardMedia
                        component='img'
                        className="fadeIn"
                        alt={`row.title`}
                        image={ ` /products/${row.img}` }
                    />
                </a>
            )
        }
    },
    {
        field: 'title',
        headerName: 'title',
        width: 250,
        renderCell: ({row}:GridValueGetterParams )=> {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline="hover">
                        {row.title}
                    </Link>
                </NextLink>
            )
        }
    },
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
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }))


    return (
        <AdminLayout
            title={`Productos ${data?.length}`}
            subTitle={'Mantenimiento de productos'}
            icon={ <CategoryOutlined /> }
        >

        <Box display='flex' justifyContent='end' sx={{mb: 2}} >
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
                href="/admin/products/new"
            >
                Crear Producto
            </Button>
        </Box>

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