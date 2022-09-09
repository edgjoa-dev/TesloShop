import React from 'react'
import { AuthLayout } from '../../components/layout';
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';


const LoginPage = () => {

    type FormData = {
        email: string,
        password: string,
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = ( data: FormData ) => {
        console.log( {data} );
    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding:'10px 20px' }} >
                    <Grid container sx={{ gap: 3 }} >
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1' >
                                Iniciar Sesión
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Correo"
                                variant='filled'
                                autoFocus = { true }
                                {...register('email')}
                                fullWidth
                            >
                                Correo
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                {...register('password')}
                                fullWidth
                            >
                                Password
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                type='submit'
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href="/auth/register" passHref>
                                <Link underline='hover' > ¿Aún no tienes una cuentá? </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>

        </AuthLayout>
    )
}

export default LoginPage;