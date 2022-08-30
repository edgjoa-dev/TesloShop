import { ShopLayout } from '../../components/layout/ShopLayout';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ProductsSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { IProducts } from '../../interfaces';
import { NextPage,  GetStaticPaths, GetStaticProps  } from 'next';
import { dbProducts } from '../../database';

interface Props {
    product: IProducts
}




const ProductPage:NextPage<Props> = ({product}) => {

    // const router = useRouter();
    // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`);

    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductsSlideshow
                        images={product.images}
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant='h1' component='h1'> {product.title} </Typography>
                        <Typography variant='subtitle1' component='h2'> {`$${product.price}`} </Typography>

                        <Box  sx={{my: 2}}>
                            <Typography variant='subtitle2' component='p' fontWeight={600}>Cantidad</Typography>
                            <ItemCounter />
                            <SizeSelector
                                // selectedSizes={product.sizes[0]}
                                sizes={product.sizes}
                            />
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



export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const productSlug = await dbProducts.getAllProductsBySlug();

    return {
        paths: productSlug.map( ({slug}) => ({
            params: {
                slug
            }

        })),

        fallback: "blocking"
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const {slug = ''} = params as {slug: string};
    const product = await dbProducts.getProductBySlug(slug)

        if(!product)
            return {
            redirect:{
                destination: '/',
                permanent: false
            }
        }


    return {
        props: {
            product
        },
        revalidate:  60 * 60 *24
    }
}


//getServerSideProps

// export const getServerSideProps: GetServerSideProps = async ({params}) => {

//     const {slug = ''} = params as {slug: string};
//     const product = await dbProducts.getProductBySlug(slug)

//     if(!product)
//         return {
//         redirect:{
//             destination: '/',
//             permanent: false
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }

export default ProductPage;