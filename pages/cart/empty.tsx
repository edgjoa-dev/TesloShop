import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layout";
import NextLink from 'next/link';

const EmptyPage = () => {
    return (
        <ShopLayout title="Carrito vacío" pageDescription="No ahy artículos en el carrito">
            <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='calc(100vh - 200px)'
                    sx={{ flexDirection: {xs: 'column', sm: 'row'}}}
                >
                    <RemoveShoppingCartOutlined sx={{fontSize: 100}}/>
                    <Typography fontSize={100} fontWeight={100}>|</Typography>

                <Box display='flex' flexDirection='column' alignItems='center' sx={{ml: 3}}>
                    <Typography variant="h6" component="h6"> Su carrito está vacío </Typography>
                    <NextLink href='/' passHref >
                        <Link typography='h6' color='secondary' > Regresar </Link>
                    </NextLink>
                </Box>

            </Box>
        </ShopLayout>
    );
}

export default EmptyPage