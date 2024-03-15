import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { useForm } from 'react-hook-form';
import { BG_Image, IWALogo } from '../assets';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const emptyFrom = {
    email: '',
    password: '',
}

export const Login = () => {
    type Account = {
        id: number,
        email: string,
        password: string,
    }

    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [form, setForm] = useState(emptyFrom);

    useEffect(()=>{
        axiosInstance.get<Account[]>('/account')
            .then((res)=>{
                setAccounts(res.data);
            })
            .catch((err)=>{console.log(err)});
    },[]);

    const {
		register, formState: { errors }, handleSubmit,
	} = useForm();

    const handlePost = async () => {
        await axiosInstance.post('/account/login', form)
        .then((res)=>{
            const login = res.data;
            if(login===true){
                console.log("login success");
                return navigate('/');
            }else{
                enqueueSnackbar('Login failed', {variant: 'error'})
            }
        })
        .catch((err)=>{
        console.log(err.response.data.message);
        });
    };

    const handleChange = (e : React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }


    return (
        <>
            <img src={IWALogo} alt='logo' style={{
                position:"absolute",
                width:"15%",
                left:"42%",
                bottom:"20%"
            }}></img>
            <img src={BG_Image} alt='logo' style={{
                display:"block",
                position:"absolute",
                width:"100%",
                height:"100%",
                zIndex:"-3",
                top:"0%",
                objectFit:"fill"
            }}></img>
            <Box
                minWidth={'25%'} 
                maxWidth={'30%'}
                margin={'auto'}
                position={'absolute'}
                left={'36%'}
                sx={{background:"white"}}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                onSubmit={() => handlePost()}
            >
                <Typography 
                    variant={'h3'} 
                    sx={{margin:'20px'}}
                >
                    Login
                </Typography>

                <TextField 
                    sx={{width:'50%', margin:'20px'} }
                    label="Email"
                    value={form.email}
                    {...register('email', {required: "email can't be empty", minLength: {value: 5, message: "email must be at least 5 characters"}})}
                    onChange={handleChange}
                    helperText={errors.email?.message?.toString()}
                    error={errors.email?.message !== undefined}
                >  
                </TextField>

                <TextField 
                    sx={{width:'50%',margin:'20px'}}
                    label="Password"
                    type='password'
                    value={form.password}
                    {...register('password', {required: "password can't be empty"})}
                    onChange={handleChange}
                    helperText={errors.password?.message?.toString()}
                    error={errors.password?.message !== undefined}
                >
                </TextField>


                <Button onClick={handleSubmit(handlePost)}
                    sx={{background: '#9a9cfb', color:'white', width:"50%",margin:'20px'}}
                >
                    Login
                </Button>

                <Typography>
                    Known users:
                </Typography>

                {accounts.map(account => {
                    return (
                        <Typography key={account.id}>
                            {account.email}
                        </Typography>
                    );
                })}
            </Box>
        </>
    );

}