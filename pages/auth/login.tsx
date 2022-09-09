import NextLink from 'next/link';
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layout';
import { validations } from '../../utils';
import { tesloApi } from '../../api';


type FormData = {
    email: string,
    password: string,
};
const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = async({ email, password }: FormData) => {
        try {

            const { data } = await tesloApi.post('/user/login', { email, password })
            const { token, user } = data;
            console.log({token, user})

        } catch (error) {
            console.log(error);
            console.log('Error de autenticación')
        }
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
                                        validate: validations.isEmail
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
                                    minLength: { value: 8, message: 'Deben ser minimo 8 caracteres' },
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