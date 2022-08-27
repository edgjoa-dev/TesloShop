import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { Typography } from '@mui/material';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products/ProductList';


const WomenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout title={'Teslo-Shop-Women'} pageDescription={'Encuentra los mejores productos para mujeres'}>
      <Typography variant='h1' component='h1'>Teslo | Women´s</Typography>
      <Typography variant='h2'  sx={{ mb: 1 }}>Todos los productos</Typography>



      {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }

    </ShopLayout>
  )
}

export default WomenPage;
