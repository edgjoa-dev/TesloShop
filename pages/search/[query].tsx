import type { NextPage, GetServerSideProps } from 'next'

import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layout';
import { dbProducts } from '../../database';
import { IProducts } from '../../interfaces';
import { ProductList } from '../../components/products/ProductList';

interface Props {
    products: IProducts[];
}



const SearchPage: NextPage<Props> = ({ products }) => {


    return (
        <ShopLayout title={'Teslo-Shop'} pageDescription={'Encuentra los mejores productos aquí'}>
        <Typography variant='h1' component='h1'>Buscar Productos</Typography>
        <Typography variant='h2'  sx={{ mb: 1 }}>ABC--123</Typography>

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

    return {
        props: {
            products
        }
    }


}

export default SearchPage;