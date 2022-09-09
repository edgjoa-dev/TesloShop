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
                                autoFocus = { true }
                                type="email"
                                label="email"
                                placeholder='correo@gmail.com'
                                fullWidth
                                {
                                    ...register('email',{
                                        required: 'Email es requerido',
                                        min: 8,
                                    })
                                }
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            >
                                Correo
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                placeholder='Almenos 8 caracteres'
                                fullWidth
                                {
                                    ...register('password',{
                                    required: 'Password es requerido',
                                    minLength: { value: 6, message: 'Deben ser minimo 8 caracteres' },
                                    })
                                }
                                error={!!errors.password}
                                helperText={errors.password?.message}
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