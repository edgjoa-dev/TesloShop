import Head from 'next/head'
import { FC } from 'react';
import { Box } from '@mui/material';



type Props = {
    title: string;
    children?: React.ReactNode;
}

export const AuthLayout:FC<Props> = ({ children, title }: Props) => {
    return (
        <>
        <Head>
            <title> { title } </title>
        </Head>
        <main>
            <Box display='flex' justifyContent='center' alignItems='center' height="calc( 100vh - 200px )">
                { children }
            </Box>
        </main>
        </>
        )
}
