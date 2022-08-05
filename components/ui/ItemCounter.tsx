import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";


interface ItemCounterProps {
}


export const ItemCounter: FC<ItemCounterProps> = () => {
    return (
        <Box display='flex' alignItems='center'>
            <IconButton>
                <RemoveCircleOutline />
            </IconButton>

            <Typography sx={{ width: 40, textAlign:'center' }}> 1 </Typography>

            <IconButton>
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}
