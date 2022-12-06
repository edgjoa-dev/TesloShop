import { Grid } from "@mui/material";
import { FC } from "react";
import { IProducts } from "../../interfaces";
import { ProductCard } from './ProductCard';

interface ProductListProps {
    products: IProducts[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
    return (
        <Grid container spacing={ 4 }>
            {
                products.map( product =>(
                    <ProductCard
                        key={ product.title }
                        product={ product }
                    />
                ))
            }
        </Grid>
    )
}
