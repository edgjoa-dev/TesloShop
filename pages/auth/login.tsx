import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Grid, Typography, TextField, Button, Link, Chip, Divider } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layout';
import { validations } from '../../utils';
//import { AuthContext } from '../../context';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { GetServerSideProps } from 'next';


type FormData = {
    email: string,
    password: string,
};
const LoginPage = () => {

    const router = useRouter()
    // const { loginUser } = useContext( AuthContext )

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    const [ providers, setProviders ] = useState<any>({});

    useEffect(() => {
        getProviders().then( prov => {
            setProviders( prov )
        })

    }, [])


    const onLoginUser = async({ email, password }: FormData) => {
        setShowError(false)

        await signIn('credentials', { email, password});

        // const isValidLogin = await loginUser(email, password)
        // if(!isValidLogin){
        //     setShowError(true)
        //     setTimeout(()=> {
        //         setShowError(false)
        //     }, 3000);
        //     return;
        // }
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination)
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
                            <NextLink href={ router.query.p ? `/auth/register?p=${ router.query.p }`:'/auth/register'} passHref>
                                <Link underline='hover' > ¿Aún no tienes una cuentá? </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values( providers ).map((provider: any) => {

                                    if(provider.id === "credentials") return(<div key="credentials"></div>)

                                    return(
                                    <Button
                                        key={ provider.id }
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                        sx={{ mb: 2 }}
                                        onClick={ () => signIn(provider.id)}
                                    >
                                        {provider.name}
                                    </Button>)
                                })
                            }
                        </Grid>

                    </Grid>
                </Box>
            </form>

        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req })

    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            }
        }
    }

    return {
        props: { }
    }
}


export default LoginPage;