import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip } from '@mui/material'
import  NextLink  from 'next/link'
import { FC, useMemo, useState } from 'react';
import { IProducts } from '../../interfaces';

  interface ProductCardProps {
    product: IProducts;
  }


export const ProductCard:FC<ProductCardProps> = ({product}) => {

  const [isHovered, setisHovered] = useState(false)
  const [isImageLoaded, setisImageLoaded] = useState(false)

  const productImage = useMemo( () => {
    return isHovered
    ? product.images[1]
    : product.images[0]
  }, [isHovered, product.images]);

  return (
    <Grid item
      xs={6}
      sm={4}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
        <Card>
          <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
            <Link>

              <CardActionArea>
                {
                  ( product.inStock === 0 ) && (
                    <Chip
                      color="primary"
                      label="Soldout..."
                      sx={{ position: 'absolute', zIndex:'9', left:'10px', top:'10px'  }}
                    />
                  )
                }
                  <CardMedia
                      component='img'
                      image={productImage}
                      alt={product.title}
                      onLoad={()=> setisImageLoaded(true)}
                  />
              </CardActionArea>
            </Link>
          </NextLink>
        </Card>

        <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
            <Typography fontWeight={700}>{product.title}</Typography>
            <Typography fontWeight={500}>{`$${product.price}`}</Typography>
        </Box>
    </Grid>
  )
}
