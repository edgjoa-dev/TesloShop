import { Grid, Card, CardActionArea, CardMedia } from '@mui/material'
import { FC } from 'react';
import { IProducts } from '../../interfaces';

  interface ProductCardProps {
    product: IProducts;
  }


export const ProductCard:FC<ProductCardProps> = ({product}) => {
  return (
    <Grid container spacing={4}>
      {
              <Grid item xs={6} sm={4} key={product.slug}>
                  <Card>
                      <CardActionArea>
                          <CardMedia
                              component='img'
                              image={`products/${product.images[0] }`}
                              alt={product.title}
                          />
                      </CardActionArea>
                  </Card>
              </Grid>
      }
    </Grid>
  )
}
