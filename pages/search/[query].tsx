import type { NextPage, GetServerSideProps } from 'next'

import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layout';
import { dbProducts } from '../../database';
import { IProducts } from '../../interfaces';
import { ProductList } from '../../components/products/ProductList';

interface Props {
    products: IProducts[];
    foundProducts: boolean;
    query: string;
}



const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


    return (
        <ShopLayout title={'Teslo-Shop'} pageDescription={'Encuentra los mejores productos aquí'}>
        <Typography variant='h1' component='h1'>Buscar Productos</Typography>
        {
            foundProducts
            ?<Typography variant='h2'  sx={{ mb: 1 }}> {query} </Typography>
            :(
                <Box display='flex'>
                    <Typography variant='h2'  sx={{ mb: 1 }}> No se encontraron productos con: </Typography>
                    <Typography variant='h2'  sx={{ ml: 1 }} color='InfoText'> {query} </Typography>
                </Box>
            )
        }

        <ProductList products={products} />
        </ShopLayout>
    )
    }

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { query = '' } = params as { query: string }

    if(query.length === 0){
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query);
    const foundProducts = products.length > 0

    if(!foundProducts){
        //products = await dbProducts.getAllProducts();
        products = await dbProducts.getProductsByTerm('shirts');
    }



    return {
        props: {
            products,
            foundProducts,
            query
        }
    }


}

export default SearchPage;