import { useContext, useState } from 'react'
import NextLink from 'next/link';
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layout';
import { validations } from '../../utils';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';


type FormData = {
    email: string,
    password: string,
};
const LoginPage = () => {

    const router = useRouter()
    const { loginUser } = useContext( AuthContext )
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false)


    const onLoginUser = async({ email, password }: FormData) => {

        setShowError(false)

        const isValidLogin = await loginUser(email, password)
        if(!isValidLogin){
            setShowError(true)
            setTimeout(()=> {
                setShowError(false)
            }, 3000);
            return;
        }

        router.replace('/')
    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding:'10px 20px' }} >

                    <Grid container sx={{ gap: 3 }} >
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'> Iniciar Sesión </Typography>
                            <Chip
                                label="Usuario/Contraseña no son correctos"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? 'className="fadeIn"' : 'none' }}
                            />
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