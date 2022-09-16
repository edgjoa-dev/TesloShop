import { GetServerSideProps } from 'next'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box, display } from '@mui/system';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { countries, jwt } from '../../utils';


const AddressPage = () => {
    return (
        <ShopLayout title='Dirección' pageDescription='Confirmar direción del destino de envío'>
            <Typography variant='h1' component='h1'>
                Dirección
            </Typography>

            <Grid container spacing={ 2 } sx={{mt: 2}}>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Nombre' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Apellido' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Dirección (Calle y Número)' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Entre calles' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Código Postal' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Ciudad' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <FormControl  fullWidth>
                        <Select
                            variant='filled'
                            label='País'
                            value={ 1 }
                        >
                            {
                                countries.map( country =>(
                                    <MenuItem
                                        key={country.code}
                                        value={country.code}
                                    >
                                        {country.name}
                                    </MenuItem>
                                ) )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField label='Teléfono' variant='filled' fullWidth/>
                </Grid>
            </Grid>

            <Box sx={{ mt:5 }} display='flex' justifyContent='center'>
                <Button color='primary' className='circular-btn' size='large'>
                    Revisar Pedido
                </Button>
            </Box>


        </ShopLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken( token );
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }
    if(!isValidToken){
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }
    return {
        props: {

        }
    }
}


export default AddressPage