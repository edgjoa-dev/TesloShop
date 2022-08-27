import type { NextPage } from 'next'

import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layout';
import { ProductList } from '../components/products/ProductList';
import { useProducts } from '../hooks/useProducts';
import { FullScreenLoading } from '../components/ui';

const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products');
  console.log(products);


  return (
    <ShopLayout title={'Teslo-Shop'} pageDescription={'Encuentra los mejores productos aquí'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2'  sx={{ mb: 1 }}>Todos los productos</Typography>

      {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }

    </ShopLayout>
  )
}

export default HomePage;