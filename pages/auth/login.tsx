import React from 'react'
import { AuthLayout } from '../../components/layout';
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import NextLink from 'next/link';


const LoginPage = () => {
    return (
        <AuthLayout title={'Ingresar'}>
            <Box sx={{ width: 350, padding:'10px 20px' }} >
                <Grid container sx={{ gap: 3 }} >
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1' >
                            Iniciar Sesión
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Correo" variant='filled' autoFocus = { true } fullWidth >
                            Correo
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Contraseña" type='password' fullWidth>
                            Password
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <Button color="secondary" className='circular-btn' size='large'>
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

        </AuthLayout>
    )
}

export default LoginPage;