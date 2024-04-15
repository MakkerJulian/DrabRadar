import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { useForm } from 'react-hook-form';
import { BG_Image, IWALogo } from '../assets';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { jwtDecode } from 'jwt-decode';

const emptyFrom = {
    email: '',
    password: '',
}

export const Login = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [form, setForm] = useState(emptyFrom);

    const {
        register, formState: { errors }, handleSubmit,
    } = useForm();

    const handlePost = async () => {
        await axiosInstance.post('/account/login', form)
            .then((res) => {
                const Login = res.data.access_token;
                if (Login) {
                    sessionStorage.setItem('token', Login);
                    sessionStorage.setItem('pw', form.password);
                    const role = jwtDecode(Login).role;
                    if (role === 'ADMIN') return navigate('/admin');
                    if (role === 'Sales') return navigate('/sales');
                    else{
                        return navigate('/');
                    }
                } else {
                    enqueueSnackbar('Login failed', { variant: 'error' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Login failed', { variant: 'error' })
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    return (
        <>
            <img src={IWALogo} alt='logo' style={{
                position: "absolute",
                width: "15%",
                left: "44%",
                bottom: "20%"
            }}></img>
            <img src={BG_Image} alt='logo' style={{
                display: "block",
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: "-3",
                top: "0%",
                objectFit: "fill"
            }}></img>
            <Box
                boxShadow={'0 0 10px rgba(0, 0, 0, 2)'}
                borderRadius={'25px'}
                minWidth={'25%'}
                maxWidth={'30%'}
                margin={'auto'}
                position={'absolute'}
                top={'10%'}
                left={'38%'}
                sx={{ background: "white" }}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                onSubmit={() => handlePost()}

            >
                <Typography
                    variant={'h3'}
                    sx={{ margin: '20px' }}
                >
                    Login
                </Typography>

                <TextField
                    sx={{ width: '50%', margin: '20px' }}
                    label="Email"
                    value={form.email}
                    {...register('email', {
                        required: "E-mail can't be empty", pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            {handleSubmit(handlePost)};
                        }
                    }}
                    helperText={errors.email?.message?.toString()}
                    error={errors.email?.message !== undefined}
                >
                </TextField>

                <TextField
                    sx={{ width: '50%', margin: '20px' }}
                    label="Password"
                    type='password'
                    value={form.password}
                    {...register('password', { required: "password can't be empty" })}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            {handleSubmit(handlePost)};
                        }
                    }}
                    helperText={errors.password?.message?.toString()}
                    error={errors.password?.message !== undefined}
                >
                </TextField>


                <Button onClick={handleSubmit(handlePost)}
                    sx={{ background: '#9a9cfb', color: 'white', width: "50%", margin: '20px' }}
                >
                    Login
                </Button>
            </Box>
        </>
    );

}