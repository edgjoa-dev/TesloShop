import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography><strong> No. Productos: </strong></Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography> <strong>Subtotal:</strong></Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{`$${ 155.36 }`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography><strong>Impuestos (16%):</strong></Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{`$${ 16.00 }`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant="subtitle1"  sx={{ mt:5 }}>Total a pagar:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography variant="subtitle1"  sx={{ mt:5 }}>{`$${ 155.52 }`}</Typography>
            </Grid>

        </Grid>
    )
}
