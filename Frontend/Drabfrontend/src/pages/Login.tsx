import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { useForm } from 'react-hook-form';
import { IWALogo } from '../assets';

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
        await axiosInstance.post<Account>('/account/login', form)
        .then((res)=>{console.log(res.data)}) //todo zet dit in session en redirect als de user deze variabele niet heeft, alleen in geval van true
        .catch((err)=>{
        console.log(err.response.data.message);
        });
    };

    const handleChange = (e : React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }


    return (
        <>
            <img src={IWALogo} alt='logo' style={{float:'right'}}></img>
            <Box 
                minWidth={'25%'} 
                maxWidth={'50%'}
                margin={'auto'}
                sx={{background:"#f4ded6"}} 
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