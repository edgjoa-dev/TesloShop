import { Grid, Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material'
import { FC, useMemo, useState } from 'react';
import { IProducts } from '../../interfaces';

  interface ProductCardProps {
    product: IProducts;
  }


export const ProductCard:FC<ProductCardProps> = ({product}) => {

  const [isHovered, setisHovered] = useState(false)

  const productImage = useMemo( () => {
    return isHovered
    ? `products/${product.images[1] }`
    : `products/${product.images[0] }`
  }, [isHovered, product.images]);

  return (
    <Grid item
      xs={6}
      sm={4}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
        <Card>
            <CardActionArea>
                <CardMedia
                    component='img'
                    image={productImage}
                    alt={product.title}

                />
            </CardActionArea>
        </Card>

        <Box mt={2}>
            <Typography fontWeight={800}>{product.title}</Typography>
            <Typography fontWeight={400}>{`$${product.price}`}</Typography>
        </Box>
    </Grid>
  )
}
