import React from 'react';
import useAuth from '../hooks/useAuth';

import useRole from '../hooks/useRole';


const AdminRoute = ({children}) => {
    const {loading} = useAuth();
    const {role,roleLoading} = useRole();
    
    if(loading || roleLoading){
        return <p>Loading...</p>;
    }
    if(role !== 'admin'){
        return <p>Access Denied. You do not have permission to view this page.</p>;

    }
    return children;
};

export default AdminRoute;