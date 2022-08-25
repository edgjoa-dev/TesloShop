import { Box, Typography } from '@mui/material';

import LinearProgress from '@mui/material/LinearProgress';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


export const FullScreenLoading = () => {
    return (
            <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 400px)'
            >
            <Box sx={{ width: '100%' }} my={3}>
                <LinearProgress />
                {/* <Typography sx={{ mb: 3 }} variant="h2" fontWeight={200} fontSize={20}> Cargando...</Typography> */}
            </Box>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3}} >
                        <Skeleton variant="rectangular" width={350} height={400} />
                        <Skeleton variant="rectangular" width={350} height={400} />
                        <Skeleton variant="rectangular" width={350} height={400} />
                    </Box>
                </Stack>
            </Box>
    )
}