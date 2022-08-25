import type { NextPage } from 'next'


import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { ShopLayout } from '../components/layout';
import { ProductList } from '../components/products/ProductList';
import { useProducts } from '../hooks/useProducts';





const Home: NextPage = () => {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-Shop'} pageDescription={'Encuentra los mejores productos aquí'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2'  sx={{ mb: 1 }}>Todos los productos</Typography>

      {
        isLoading
        ?
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3}} >
          <Skeleton variant="rectangular" width={350} height={400} />
          <Skeleton variant="rectangular" width={350} height={400} />
          <Skeleton variant="rectangular" width={350} height={400} />
          </Box>
        </Stack>
        : <ProductList products={products} />
      }

    </ShopLayout>
  )
}

export default Home
