import { Box, Typography } from '@mui/material';
import React, { useEffect } from "react";
import axiosInstance from '../axios';
import { Customer } from '../types';


export const CustomerDetails = () => {
    const [customer, setCustomer] = React.useState<Customer>();

    useEffect(() => {
        const id = window.location.pathname.split("/")[2];
        axiosInstance.get(`/customer/${id}`).then((response) => {
            setCustomer(response.data);
        });
    }, []);

    return (
        <Box>
            <Typography variant="h1">
                Customer {customer?.name}
            </Typography>

            {customer?.email} <br></br>
            {customer?.phone}
            

        </Box>
    )
}