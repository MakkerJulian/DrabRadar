import React, { useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import axiosInstance from "../axios";
import { Customer } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
  
export const Sales = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);   
  const [openCustomer, setOpenCustomer] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'id', flex: 0.5, headerName: 'ID',
    },
    {
      field: 'name', flex: 1, headerName: 'Name',
    },
    {
      field: 'email', flex: 1, headerName: 'E-mail',
    },
    {
      field: 'phone', flex: 1, headerName: 'Phone number',
    },
    {
      field: 'subscriptions',
      flex: 1,
      headerName: 'Subscriptions',
      renderCell: (params) => (
        <>
          <Typography>{params.row.subscriptions.length}</Typography>
          <IconButton
            onClick={()=>navigate(`/customer/${params.row.id}`)}>
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

        <Button 
          sx={{backgroundColor:'green', color:'white'}}
          onClick={() => {
            setOpenCustomer(!openCustomer);
          }}
        >
          Add new customer
        </Button>

        <DataGrid 
          rows={customers} 
          columns={columns} 
          sx={{maxWidth:'60%', margin:'auto'}}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'asc' }],
            },
          }}
        >         
        </DataGrid>
      </Box>
    )
}