import { DashboardRounded, DragIndicatorRounded, LocalMallOutlined, ShoppingCartRounded, TableRowsRounded, TuneRounded } from "@mui/icons-material";

export const VENDOR_PAGES = [
    { title: 'Dashboard', path: '/dashboard/vendor', icon: <DashboardRounded /> },
    { title: 'Products', path: '/dashboard/vendor/products', icon: <DragIndicatorRounded /> },
    { title: 'Services', path: '/dashboard/vendor/services', icon: <TuneRounded /> },
    { title: 'Orders', path: '/dashboard/vendor/orders', icon: <LocalMallOutlined /> },
];

export const ADMIN_PAGES = [
    { title: 'Dashboard', path: '/dashboard/admin', icon: <DashboardRounded /> },
    { title: 'Categories', path: '/dashboard/admin/categories', icon: <TableRowsRounded /> },
];

export const CUSTOMER_PAGES = [
    { title: 'Dashboard', path: '/dashboard/customer', icon: <DashboardRounded /> },
    { title: 'Orders', path: '/dashboard/customer/orders', icon: <LocalMallOutlined /> },
];