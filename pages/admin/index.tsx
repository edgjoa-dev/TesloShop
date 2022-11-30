import { DashboardOutlined, CreditCardOffOutlined, AttachMoneyOutlined, CreditCard, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import React from 'react'
import { SummaryTile } from '../../components/admin/SummaryTile';
import { AdminLayout } from '../../components/layout'


const DashBoardPage = () => {
    return (
        <AdminLayout
            title='Dashboard'
            subTitle='Estadisticas Generales'
            icon={<DashboardOutlined />}
        >

            <Grid container spacing={2}>

                <SummaryTile
                    title={ 1 }
                    subTitle="Ordenes Totales"
                    icon={ <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ 0 }
                    subTitle="Ordenes Pagadas"
                    icon={ <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ 3 }
                    subTitle="Ordenes Pendientes"
                    icon={ <CreditCard color="error" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ 1 }
                    subTitle="Clientes"
                    icon={ <GroupOutlined color="primary" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ 1 }
                    subTitle="Productos"
                    icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ 1 }
                    subTitle="Productos Sin Stock"
                    icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ 6 }
                    subTitle="Productos Bajo Invenatrio"
                    icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> }
                />

                <SummaryTile
                    title={ 30 }
                    subTitle="Actualización en vivo: "
                    icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> }
                />


            </Grid>

        </AdminLayout>
    )
}

export default DashBoardPage;