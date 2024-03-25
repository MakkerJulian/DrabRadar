import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axiosInstance from "../axios";
import { Account, AccountCreate } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { CustomModal } from "../components/customModal";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";

const emptyForm: AccountCreate = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
}

export const Admin = () => {
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const [openAccount, setOpenAccount] = React.useState<boolean>(false);
    const [form, setForm] = React.useState<AccountCreate>(emptyForm);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const createAccount = () => {
        axiosInstance.post('/account', form).then(() => {
            enqueueSnackbar('Account created', { variant: 'success' });
            setOpenAccount(false);
            axiosInstance.get<Account[]>('/account').then((response) => {
                setAccounts(response.data);
            });
        }).catch(() => {
            enqueueSnackbar('Failed to create account', { variant: 'error' });
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
            field: 'role', flex: 1, headerName: 'Role',
        }

    ]

    useEffect(() => {
        axiosInstance.get<Account[]>('/account').then((response) => {
            console.log(response.data);
            setAccounts(response.data);
        });
    }, []);

    return (
        <Box flex={1} flexDirection={'column'}>
            <Typography variant="h1">
                Admin
            </Typography>

            <Button //green button
                sx={{ backgroundColor: 'blue', color: 'white' }}
                onClick={() => {
                    setOpenAccount(!openAccount);
                }}
            >
                Add new account
            </Button>

            <DataGrid
                rows={accounts}
                columns={columns}
                sx={{ maxWidth: '60%', margin: 'auto' }}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }],
                    },
                }}
            >
            </DataGrid>

            <CustomModal
                open={openAccount}
                title="Add new account"
                setOpen={setOpenAccount}
                onSubmit={handleSubmit(createAccount)}
            >
                <TextField
                    sx={{ width: '50%', margin: '20px' }}
                    label="Name"
                    value={form.name}
                    {...register('name', { required: "name can't be empty", minLength: { value: 5, message: "name must be at least 5 characters" } })}
                    onChange={handleChange}
                    helperText={errors.name?.message?.toString()}
                    error={errors.name?.message !== undefined}
                >
                </TextField>

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
                >
                </TextField>


                <TextField
                    sx={{ width: '50%', margin: '20px' }}
                    label="Phone number"
                    type='phone'
                    value={form.phone}
                    {...register('phone', { required: "phone number can't be empty" })}
                    onChange={handleChange}
                    helperText={errors.phone?.message?.toString()}
                    error={errors.phone?.message !== undefined}
                >
                </TextField>

                <TextField
                    sx={{ width: '50%', margin: '20px' }}
                    label="Password"
                    value={form.password}
                    {...register('password', { required: "password can't be empty" })}
                    onChange={handleChange}
                    helperText={errors.password?.message?.toString()}
                    error={errors.password?.message !== undefined}
                >
                </TextField>

                <TextField //Todo change to select
                    sx={{ width: '50%', margin: '20px' }}
                    label="Role"
                    value={form.role}
                    {...register('role', { required: "role can't be empty" })}
                    onChange={handleChange}
                    helperText={errors.role?.message?.toString()}
                    error={errors.role?.message !== undefined}
                >
                </TextField>
            </CustomModal>

        </Box>
    )
}