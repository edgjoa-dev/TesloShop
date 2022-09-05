import { ShopLayout } from '../../components/layout/ShopLayout';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { NextPage,  GetStaticPaths, GetStaticProps  } from 'next';

import { ProductsSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { ICartProduct, IProducts, ISize } from '../../interfaces';
import { dbProducts } from '../../database';
<<<<<<< HEAD
=======
import { useState, useContext } from 'react';
>>>>>>> f7ae69cd30712e90ca09dfa9a68975c191c225b9
import { useRouter } from 'next/router';
import { CartContext } from '../../context';

interface Props {
    product: IProducts
}




const ProductPage:NextPage<Props> = ({product}) => {

<<<<<<< HEAD
    const router = useRouter();
=======
    const router = useRouter()
>>>>>>> f7ae69cd30712e90ca09dfa9a68975c191c225b9
    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    })

    const selectedSize = ( size: ISize ) => {
        setTempCartProduct( currentProduct =>({
            ...currentProduct,
            size
        }))
    }

    const onUpdteQuantity = ( quantity: number ) => {
        setTempCartProduct( currentProduct =>({
            ...currentProduct,
            quantity
        }))
    }

<<<<<<< HEAD
    const onAddProduct = () => {
        if(!tempCartProduct.size) {return};

        //llamar accion de context para agregar al carrito
        addProductToCart(tempCartProduct)
        console.log(tempCartProduct)

=======
    const onAddProduct = ( quantity: number ) => {
        if( !tempCartProduct.size ){return};

        //llamar la accion del context para agregar al carrito
        addProductToCart(tempCartProduct);
>>>>>>> f7ae69cd30712e90ca09dfa9a68975c191c225b9
        router.push('/cart')
    }

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
                            {/* item couter */}
                            <ItemCounter
                                currentValue = { tempCartProduct.quantity }
                                updatedQuantity = { onUpdteQuantity }
                                maxValue = {  product.inStock > 5 ? 5 : product.inStock }
                            />

                            <SizeSelector
                                sizes = { product.sizes }
                                selectedSizes = { tempCartProduct.size}
                                onSelectedSize={selectedSize}
                            />
                        </Box>

                        {/* Agregar al carrito */}
                        {
                            ( product.inStock > 0 )
                            ?(
                                <Button
<<<<<<< HEAD
                                color='secondary'
                                className='circular-btn'
                                onClick={onAddProduct}
=======
                                    color='secondary'
                                    className='circular-btn'
                                    onClick={onAddProduct}
>>>>>>> f7ae69cd30712e90ca09dfa9a68975c191c225b9
                                >
                                    {
                                        tempCartProduct.size
                                        ? 'Agregar producto'
                                        : 'Seleccione un talla'
                                    }
                                </Button>)
                            :(<Chip label='Articulo Agotado' color='error' variant='outlined' />)
                        }

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