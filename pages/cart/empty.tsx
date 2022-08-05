import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layout";
import NextLink from 'next/link';
import { fontWeight } from "@mui/system";

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
                    <Typography sx={{ fontSize: 150,}}>
                        <RemoveShoppingCartOutlined sx={{fontSize: 150}} />
                    </Typography>
                <Box display='flex' flexDirection='column' alignItems='center' >
                    <Typography> Su carrito está vacío </Typography>
                    <NextLink href='/' passHref >
                        <Link typography='h6' color='secondary' > Regresar </Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    );
}

export default EmptyPage