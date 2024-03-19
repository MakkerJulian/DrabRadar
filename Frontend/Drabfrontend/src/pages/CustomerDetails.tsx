import { Box, Typography } from '@mui/material';
import React, { useEffect } from "react";
import axiosInstance from '../axios';
import { Customer } from '../types';


export const CustomerDetails = () => {
    const [user, setUser] = React.useState<Customer>();

    useEffect(() => {
        const id = window.location.pathname.split("/")[2];
        axiosInstance.get(`/customer/{id}`).then((response) => {
            setUser(response.data);
        });
    }, []);

    const id = window.location.pathname.split("/")[2];
    return (
        <Box>
            <Typography variant="h1">
                Customer {user?.name}
            </Typography>
        </Box>
    )
}