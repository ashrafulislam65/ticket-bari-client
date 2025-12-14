import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const VendorRoute = ({children}) => {
    const { loading,user } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <p>Loading...</p>;
    }
    if (role !== 'vendor') {
        return <p>Access Denied. You do not have permission to view this page.</p>;

    }
    return children;
};

export default VendorRoute;