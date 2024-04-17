import React, { useEffect } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import axiosInstance from "../axios";
import { Customer, CustomerCreate } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { CustomModal } from "../components/customModal";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {LogoutButton} from "../components/logoutButton.tsx";

const emptyForm: CustomerCreate = {
  name: '',
  email: '',
  phone: '',
}

export const Sales = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [openCustomer, setOpenCustomer] = React.useState<boolean>(false);

  const [form, setForm] = React.useState<CustomerCreate>(emptyForm);

  const navigate = useNavigate();
  const {
    register, formState: { errors }, handleSubmit,
  } = useForm();

  const createCustomer = () => {
    axiosInstance.post('/customer', form).then(() => {
      enqueueSnackbar('Customer created', { variant: 'success' });
      setOpenCustomer(false);
      axiosInstance.get<Customer[]>('/customer').then((response) => {
        setCustomers(response.data);
      });
    }).catch(() => {
      enqueueSnackbar('Failed to create customer', { variant: 'error' });
    });
  }



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


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
      field: 'subscription',
      flex: 1,
      headerName: 'Subscription',
      renderCell: (params) => (
        <>
          <Typography>{params.row.subscription ? "active" : "inactive"}</Typography>
          <IconButton
            onClick={() => navigate(`/customer/${params.row.id}`)}>
            <VisibilityIcon />
          </IconButton>
        </>
      )
    }
  ];

  useEffect(() => {
    axiosInstance.get<Customer[]>('/customer').then((response) => {
      setCustomers(response.data);
    });
  }, []);
  
  return (
    <Box flex={1} flexDirection={'column'} overflow={'hidden'} >
      <Box>
        <LogoutButton/>
      </Box>
      <Typography variant="h1" style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        Sales
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20%', marginBottom: "0.5%" }}>
        <Button
          sx={{ backgroundColor: 'green', color: 'white', borderRadius: '5px', '&:hover': { backgroundColor: 'darkgreen' } }}
          onClick={() => {
            setOpenCustomer(!openCustomer);
          }}
        >
          Add new customer
        </Button>
      </Box>
      <Box height={'80vh'}> {/* Set the height to a percentage of the viewport height */}
        <DataGrid
          rows={customers}
          columns={columns}
          pagination
          sx={{ maxWidth: '60%', margin: 'auto' }}
          initialState={{
            sorting: { sortModel: [{ field: 'id', sort: 'asc' }] }, pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        />
      </Box>

      <CustomModal
        open={openCustomer}
        title="Add new customer"
        setOpen={setOpenCustomer}
        onSubmit={handleSubmit(createCustomer)}
      >
        <TextField
          sx={{ width: '50%', margin: '20px' }}
          label="Name"
          value={form.name}
          {...register('name', { required: "name can't be empty", minLength: { value: 5, message: "name must be at least 5 characters" } })}
          onChange={handleChange}
          helperText={errors.name?.message?.toString()}
          error={errors.name?.message !== undefined}
        />
        <TextField
          sx={{ width: '50%', margin: '20px' }}
          label="E-mail"
          value={form.email}
          {...register('email', {
            required: "E-mail can't be empty", pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
          onChange={handleChange}
          helperText={errors.email?.message?.toString()}
          error={errors.email?.message !== undefined}
        />
        <TextField
          sx={{ width: '50%', margin: '20px' }}
          label="Phone number"
          type='phone'
          value={form.phone}
          {...register('phone', { required: "password can't be empty" })}
          onChange={handleChange}
          helperText={errors.phone?.message?.toString()}
          error={errors.phone?.message !== undefined}
        />
      </CustomModal>
    </Box>
  )
}
