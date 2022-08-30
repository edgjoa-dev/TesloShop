import type { NextPage, GetServerSideProps } from 'next'

import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products/ProductList';
import { useProducts } from '../../hooks/useProducts';
import { FullScreenLoading } from '../../components/ui';

const SearchPage: NextPage = () => {

    const { products, isLoading } = useProducts('/search/');
    console.log(products);


    return (
        <ShopLayout title={'Teslo-Shop'} pageDescription={'Encuentra los mejores productos aquí'}>
        <Typography variant='h1' component='h1'>Buscar Productos</Typography>
        <Typography variant='h2'  sx={{ mb: 1 }}>ABC--123</Typography>

        {
            isLoading
            ? <FullScreenLoading />
            : <ProductList products={products} />
        }

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



    return {
        props: {
            query
        }
    }


}

export default SearchPage;