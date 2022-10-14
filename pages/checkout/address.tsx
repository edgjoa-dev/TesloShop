import { GetServerSideProps } from 'next'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box, display } from '@mui/system';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { countries, jwt } from '../../utils';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cart/CartContext';


type FormData = {
    firstName: string;
    lastName:  string;
    address:   string;
    address2?:  string;
    zip:       string;
    city:      string;
    country:   string;
    phone:     string;
}

const getAddressFromCookies = ():FormData => {

    return {
        firstName: Cookies.get('firstName') || '',
        lastName : Cookies.get('lastName') || '',
        address  : Cookies.get('address') || '',
        address2 : Cookies.get('address2') || '',
        zip      : Cookies.get('zip') || '',
        city     : Cookies.get('city') || '',
        country  : Cookies.get('country') || '',
        phone    : Cookies.get('phone') || '',
    }

}


const AddressPage = () => {

    const router = useRouter();
    const { updateAddress } = useContext( CartContext )

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: countries[4].code,
            phone: '',
        }
    });

    useEffect(() => {
        getAddressFromCookies()
    }, [ reset ])


    const onSubmitAddress = ( data: FormData ) => {

        updateAddress(data);
        router.push('/checkout/summary');
    }

    return (
    <ShopLayout title='Dirección' pageDescription='Confirmar direción del destino de envío'>
    <form onSubmit={handleSubmit(onSubmitAddress)}>

            <Typography variant='h1' component='h1'>
                Dirección
            </Typography>

            <Grid container spacing={ 2 } sx={{mt: 2}}>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                    label='Nombre'
                    variant='filled'
                    fullWidth
                    {
                        ...register('firstName',{
                        required: 'Nombre es requerido',
                        minLength: { value: 2, message: 'Deben ser minimo 2 caracteres' },
                        })
                    }
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                    label='Apellido'
                    variant='filled'
                    fullWidth
                    {
                        ...register('lastName',{
                        required: 'Apellido es requerido',
                        minLength: { value: 2, message: 'Deben ser minimo 2 caracteres' },
                        })
                    }
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                    label='Dirección (Calle y Número)'
                    variant='filled'
                    fullWidth
                    {
                        ...register('address',{
                        required: 'Dirección es requerida',
                        minLength: { value: 3, message: 'Deben ser minimo 3 caracteres' },
                        })
                    }
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                    label='Municipio y Estado'
                    variant='filled'
                    fullWidth
                    {
                        ...register('address2')
                    }
                    error={!!errors.address2}
                    helperText={errors.address2?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                    label='Código Postal'
                    variant='filled'
                    fullWidth
                    {
                        ...register('zip',{
                        required: 'Código postal es requerido',
                        minLength: { value: 5, message: 'Deben ser minimo 5 caracteres' },
                        })
                    }
                    error={!!errors.zip}
                    helperText={errors.zip?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                    label='Colonia'
                    variant='filled'
                    fullWidth
                    {
                        ...register('city',{
                        required: 'Ciudad es requerido',
                        minLength: { value: 3, message: 'Deben ser minimo 3 caracteres' },
                        })
                    }
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    {/* <FormControl  fullWidth> */}
                        <TextField
                            //select
                            variant='filled'
                            label='País'
                            fullWidth
                            // defaultValue={ Cookies.get('country') || countries[4].code }
                            {
                                ...register('country',{
                                required: 'País es requerido',
                                })
                            }
                            error={!!errors.country}
                            helperText={errors.country?.message}
                        >
                            {/* {
                                countries.map( country =>(
                                    <MenuItem
                                        key={country.code}
                                        value={country.code}
                                    >
                                        {country.name}
                                    </MenuItem>
                                ) )
                            } */}
                        </TextField>
                    {/* </FormControl> */}
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                    label='Teléfono'
                    variant='filled'
                    fullWidth
                    {
                        ...register('phone',{
                        required: 'Teléfono es requerido',
                        minLength: { value: 10, message: 'Deben ser minimo 10 caracteres' },
                        })
                    }
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt:5 }} display='flex' justifyContent='center'>
                <Button
                color='primary'
                className='circular-btn'
                size='large'
                type="submit"
                >
                    Revisar Pedido
                </Button>
            </Box>
    </form>


        </ShopLayout>
    )
}


// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken( token );
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }
//     if(!isValidToken){
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }
//     return {
//         props: {}
//     }
// }


export default AddressPage