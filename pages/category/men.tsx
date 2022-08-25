import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { Typography } from '@mui/material';
import { FullScreenLoading } from '../../components/ui';
//import { ProductList } from '../../components/products/ProductList';


const MenPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-Shop-Men'} pageDescription={'Encuentra los mejores productos para hombres aquí'}>
      <Typography variant='h1' component='h1'>Teslo | Men´s</Typography>
      <Typography variant='h2'  sx={{ mb: 1 }}>Todos los productos</Typography>

      <FullScreenLoading />

      {/* {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={products} />
      } */}

    </ShopLayout>
  )
}

export default MenPage;