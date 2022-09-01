import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { ISize } from '../../interfaces/products';

interface SizeProsps {
    selectedSizes?: ISize;
    sizes: ISize[];

    //method
    onSelectedSize: (size: ISize) => void;
}

export const SizeSelector:FC<SizeProsps> = ({selectedSizes, sizes, onSelectedSize }) => {
    return (
        <Box>
            {
                sizes.map( size => (
                    <Button
                        key={ size }
                        size='small'
                        color={selectedSizes === size ? 'primary' : 'info'}
                        onClick={ () => onSelectedSize(size) }
                    >
                        { size }
                    </Button>
                ))
            }
        </Box>
    )
}