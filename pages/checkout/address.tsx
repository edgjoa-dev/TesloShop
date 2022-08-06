import { Grid, TextField, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';

const AddressPage = () => {
    return (
        <ShopLayout title='Dirección' pageDescription='Confirmar direción del destino de envío'>
            <Typography variant='h1' component='h1'>
                Dirección
            </Typography>

            <Grid container spacing={ 2 }>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Nombre' variant='filled' fullWidth/>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default AddressPage