import React, { useContext } from 'react'
import { useState } from 'react'
import NextLink from 'next/link';
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layout';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';


type FormData = {
    name: string,
    email: string,
    password: string,
};

const RegisterPage = () => {
    const router = useRouter();
    const { registerUser } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false)
    const [ errorMEssage, setErrorMessage ] = useState('')

    const onRegisterForm = async({ name, email, password }: FormData) => {

        setShowError(false)
        const { hasError, message } = await registerUser(name, email, password);
        if(hasError){
            setShowError(true)
            setErrorMessage( message || '');
            setTimeout(()=> {
                setShowError(false)
            }, 3000);
            return
        }

        router.replace('/')
    }



    return (
        <AuthLayout title={'Ingresar'}>
            <form  onSubmit={handleSubmit(onRegisterForm)}>
                <Box sx={{ width: 350, padding:'10px 20px' }} >
                    <Grid container sx={{ gap: 3 }} >
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1' >
                                Crear Cuenta
                            </Typography>
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
                                label="Nombre"
                                type='name'
                                variant='filled'
                                autoFocus={true}
                                fullWidth
                                {
                                    ...register('name',{
                                    required: 'Nombre es requerido',
                                    minLength: { value: 3, message: 'Deben ser minimo 3 caracteres' },
                                    })
                                }
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                >
                                Nombre Completo
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Correo" type='email' variant='filled' fullWidth
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
                                Register
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink
                                href={ router.query.p ? `/auth/login?p=${ router.query.p }`:'/auth/login'}
                                passHref
                            >
                                <Link underline='hover' > ¿Yá tienes una cuentá? </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>

        </AuthLayout>
    )
}

export default RegisterPage;