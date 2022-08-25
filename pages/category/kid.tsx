import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { Typography } from '@mui/material';
import { FullScreenLoading } from '../../components/ui';
//import { ProductList } from '../../components/products/ProductList';


const KidPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-Shop-kids'} pageDescription={'Encuentra los mejor ropa kids'}>
      <Typography variant='h1' component='h1'>Teslo | Kids</Typography>
      <Typography variant='h2'  sx={{ mb: 1 }}>Todos lo productos</Typography>

      <FullScreenLoading />

      {/* {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={products} />
      } */}

    </ShopLayout>
  )
}

export default KidPage;
