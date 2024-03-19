import React, { useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import axiosInstance from "../axios";
import { Customer } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
  
export const Sales = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);   
  const [openSubscriptions, setOpenSubscriptions] = React.useState<boolean>(false);
  const [openCustomer, setOpenCustomer] = React.useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'id',
    },
    {
      field: 'name',
    },
    {
      field: 'email',
    },
    {
      field: 'phone',
    },
    {
      field: 'subscriptions',
      renderCell: (params) => (
        <>
          <Typography>{params.row.subscriptions.length}</Typography>
          <IconButton
          onClick={()=>setOpenSubscriptions(!openSubscriptions)}>
            <VisibilityIcon/>
          </IconButton>
        </>
      )
    }
  ];
 

  useEffect(() => {
    axiosInstance.get<Customer[]>('/customer').then((response) => {
        console.log(response.data);
        setCustomers(response.data);
    });
  }, []);

    return (
      <Box flex={1} flexDirection={'column'}>
        <Typography variant="h1">
              Sales
        </Typography>

        <DataGrid rows={customers} columns={columns} sx={{maxWidth:'60%', margin:'auto'}}>
                     
        </DataGrid>

      </Box>
    )
}