import React from 'react'
import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { Grid, Typography } from '@mui/material';
import { DashboardOutlined, CreditCardOffOutlined, AttachMoneyOutlined, CreditCard, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';

import { SummaryTile } from '../../components/admin/SummaryTile';
import { AdminLayout } from '../../components/layout'

import { DashboardSummaryResponse } from '../../interfaces';


const DashBoardPage = () => {

    const {data, error} = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 seconds
    })

    const [refreshIn, setRefreshIn] = useState(30)

    useEffect(() => {
    const interval = setInterval(() =>{
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1 : 30 );
    }, 1000)

        return () => clearInterval(interval)
    }, [])




    if(!error && !data){
        return <></>
    }

    if(error){
        console.log(error)
        return <Typography> Error al cargar la información </Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,

    } = data!;

    return (
        <AdminLayout
            title='Dashboard'
            subTitle='Estadisticas Generales'
            icon={<DashboardOutlined />}
        >

            <Grid container spacing={2}>

                <SummaryTile
                    title={ numberOfOrders }
                    subTitle="Ordenes Totales"
                    icon={ <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ paidOrders }
                    subTitle="Ordenes Pagadas"
                    icon={ <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ notPaidOrders }
                    subTitle="Ordenes Pendientes"
                    icon={ <CreditCard color="error" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ numberOfClients }
                    subTitle="Clientes"
                    icon={ <GroupOutlined color="primary" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ numberOfProducts }
                    subTitle="Productos"
                    icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ productsWithNoInventory }
                    subTitle="Productos Sin Stock"
                    icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ lowInventory }
                    subTitle="Productos Bajo Invenatrio"
                    icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ refreshIn }
                    subTitle="Actualización en vivo: "
                    icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> }
                />


            </Grid>

        </AdminLayout>
    )
}

export default DashBoardPage;