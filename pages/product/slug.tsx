import { ShopLayout } from '../../components/layout/ShopLayout';
import { initialData } from '../../database/products';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

const product = initialData.products[0];

const ProductPage = () => {
    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant='h1' component='h1'> {product.title} </Typography>
                        <Typography variant='subtitle1' component='h2'> {`$${product.price}`} </Typography>

                        <Box  sx={{my: 2}}>
                            <Typography variant='subtitle2' component='p' fontWeight={600}>Cantidad</Typography>
                            {/* item couter */}
                        </Box>

                        {/* Agregar al carrito */}
                        <Button color='secondary' className='circular-btn'>
                            Agregar al carrito
                        </Button>

                        {/* <Chip label='Soldout' color='error' variant='outlined' /> */}

                        {/* descrpcion del producto */}
                        <Box  sx={{ mt: 3 }}>
                            <Typography variant='subtitle2' fontWeight={600}>Descripción</Typography>
                            <Typography variant='body2'>{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default ProductPage;