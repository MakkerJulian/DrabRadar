import React, { useEffect } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import axiosInstance from "../axios";
import { Account, AccountCreate } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
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
        </Box>
    )
}