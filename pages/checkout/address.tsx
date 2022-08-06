import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
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
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Apellido' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Dirección' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Dirección 2 (opcional)' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Código Postal' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Ciudad' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <FormControl  fullWidth>
                        <InputLabel>País</InputLabel>
                        <Select
                            variant='filled'
                            label='País'
                            value={ 1 }
                        >
                            <MenuItem value={ 1 }>México</MenuItem>
                            <MenuItem value={ 2 }>Estados Unidos</MenuItem>
                            <MenuItem value={ 3 }>Cánada</MenuItem>
                            <MenuItem value={ 4 }>Guatemala</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Ciudad' variant='filled' fullWidth/>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default AddressPage