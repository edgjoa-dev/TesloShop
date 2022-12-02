import  React  from "react";
import { AdminLayout } from '../../components/layout/AdminLayout';
import { ConfirmationNumberOutlined } from '@mui/icons-material';

const OrdersPage = () => {
    return (
        <AdminLayout
            title={'Ordenes'}
            subTitle={'Mantenimiento de ordenes'}
            icon={ <ConfirmationNumberOutlined /> }
        >

        </AdminLayout>
    )
}

export default OrdersPage