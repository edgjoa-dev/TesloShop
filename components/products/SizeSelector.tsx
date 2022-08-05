import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { ISize } from '../../interfaces/products';

interface SizeProsps {
    selectedSizes?: ISize;
    sizes: ISize[];
}

export const SizeSelector:FC<SizeProsps> = ({selectedSizes, sizes }) => {
    return (
        <Box>
            {
                sizes.map(size => (
                    <Button
                        key={size}
                        size='small'
                        color={selectedSizes === size ? 'primary' : 'info'}
                    >
                        { size }
                    </Button>
                ))
            }
        </Box>
    )
}