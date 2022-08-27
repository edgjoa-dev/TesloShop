import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { Typography } from '@mui/material';
import { FullScreenLoading } from '../../components/ui';
import { NextPage } from 'next';
import { ProductList } from '../../components/products/ProductList';


const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');
  console.log(products);


  return (
    <ShopLayout title={'Teslo-Shop-Men´s'} pageDescription={'Encuentra los mejor ropa para hombres'}>
      <Typography variant='h1' component='h1'>Teslo | Kids</Typography>
      <Typography variant='h2'  sx={{ mb: 1 }}>Productos Niños</Typography>

      {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }

    </ShopLayout>
  )
}

export default MenPage;