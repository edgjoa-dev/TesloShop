import { Grid, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react'

interface Props {
    title: string | number;
    subTitle: string;
    icon: JSX.Element;
}

export const SummaryTile:FC<Props> = ({title,  subTitle, icon}) => {
    return (
    <Grid item xs={12} sm={4} md={3} sx={{padding:'1.5rem'}}>

        <Card sx={{ display:'flex', padding:'3rem' }}>

            <CardContent sx={{ width: 50, display: 'flex', justifyContent:'center', alignItems:'center' }}>
                {icon}
            </CardContent>

            <CardContent sx={{ display:'flex', flex:'1 0 auto', flexDirection:'column' }}>
                <Typography variant='h3'>{title}</Typography>
                <Typography variant='caption'>{subTitle}</Typography>
            </CardContent>

        </Card>

    </Grid>
    )
}
