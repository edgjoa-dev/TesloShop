import { Grid, Typography } from "@mui/material"
import { useContext, FC } from 'react';
import { CartContext } from "../../context";
import { currency } from "../../utils";



interface Props {
    orderValues?: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
    }
}


export const OrderSummary: FC<Props> = ({ orderValues }) => {

    const { numberOfItems, subTotal, tax, total } = useContext(CartContext)

    const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, tax, total };

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography><strong> No. Productos: </strong></Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography> { summaryValues.numberOfItems } { summaryValues.numberOfItems > 1 ? 'productos' : 'productos' } </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography> <strong>Subtotal:</strong></Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(summaryValues.subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography><strong>Impuestos ( {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}% ):</strong></Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(summaryValues.tax)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant="subtitle1"  sx={{ mt:5 }}>Total a pagar:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography variant="subtitle1"  sx={{ mt:5 }}>{currency.format(summaryValues.total)}</Typography>
            </Grid>

        </Grid>
    )
}
