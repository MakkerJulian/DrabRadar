import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect } from "react";
import axiosInstance from '../axios';
import { Customer, Weatherstation } from '../types';
import { enqueueSnackbar } from 'notistack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CustomModal } from '../components/customModal';
import { useForm } from 'react-hook-form';


const emptyNewContractForm = {
    level: "0",
    subscriptionId: 0,
    weatherstations: []
}

export const CustomerDetails = () => {
    const [customer, setCustomer] = React.useState<Customer>();
    const [newContractForm, setNewContractForm] = React.useState(emptyNewContractForm);
    const [openNewContract, setOpenNewContract] = React.useState<boolean>(false);
    const [weatherstations, setWeatherstations] = React.useState<Weatherstation[]>([]);
    const [usedWeatherstations, setUsedWeatherstations] = React.useState<Weatherstation[]>([]);

    const {
        register, formState: { errors }, handleSubmit,
    } = useForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewContractForm({ ...newContractForm, [e.target.name]: e.target.value });
    }


    const createContract = (subscriptionId: number) => {
        const newContract = {
            ...newContractForm,
            subscriptionId: subscriptionId,
            weatherstations: usedWeatherstations.map(ws => ws.name)
        }
        console.log(newContract);
        axiosInstance.post('/contract', newContract).then(() => {
            enqueueSnackbar('Contract created', { variant: 'success' });
            setOpenNewContract(false);
            axiosInstance.get<Customer>(`/customer/${customer?.id}`).then((response) => {
                setCustomer(response.data);
            });
        }).catch(() => {
            enqueueSnackbar('Failed to create contract', { variant: 'error' });
        });
    }


    function addSubscription(customerId: number) {
        const form = {
            customer: customerId
        }
        axiosInstance.post(`/subscription`, form).then((response) => {
            if (response.data) {
                axiosInstance.get<Customer>(`/customer/${customerId}`).then((response) => {
                    setCustomer(response.data);
                });
                enqueueSnackbar("Subscription added", { variant: "success" });
            }
        }).catch(() => {
            enqueueSnackbar("Failed to add subscription", { variant: "error" });
        });
    }

    function refreshSubscription(customerId: number) {
        axiosInstance.post(`/subscription/refresh_token/${customerId}`).then((response) => {
            if (response.data) {
                axiosInstance.get<Customer>(`/customer/${customerId}`).then((response) => {
                    setCustomer(response.data);
                });
                enqueueSnackbar("Token refreshed", { variant: "success" });
            }
        }).catch(() => {
            enqueueSnackbar("Failed to refresh token", { variant: "error" });
        });
    }

    useEffect(() => {
        const id = window.location.pathname.split("/")[2];
        axiosInstance.get<Customer>(`/customer/${id}`).then((response) => {
            setCustomer(response.data);
        });

        axiosInstance.get<Weatherstation[]>('/weatherstation')
            .then((res) => {
                setWeatherstations(res.data);
            })
            .catch((err) => { console.log(err) });
    }, []);

    return customer ? (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="h1" margin={'auto'}>
                Customer: {customer.name}
            </Typography>

            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant="h4">
                    Name: {customer.name}<br></br>
                    Phone number: {customer.phone} <br></br>
                    Mail: {customer.email} <br></br>
                </Typography>

                <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant="h2">
                        Subscription: {customer.subscription ? customer.subscription.id : "No subscription"}
                    </Typography>

                    <Button
                        sx={{
                            backgroundColor: 'green',
                            color: 'white',
                            ":hover": {
                                backgroundColor: 'darkgreen',
                            }
                        }}
                        onClick={!customer.subscription ? () => addSubscription(customer.id) : () => refreshSubscription(customer.id)}
                    >
                        {!customer.subscription ? 'Add Subscription' : 'Refresh Token'}
                    </Button>

                </Box>
            </Box>

            {customer.subscription && (
                <Box width={'50%'} margin={'auto'}>
                    <Box display={'flex'}>
                        <Typography variant="h3" margin={'auto'}>
                            Contracts
                        </Typography>
                        {customer.subscription && (
                            <Button
                                sx={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    ":hover": {
                                        backgroundColor: 'darkgreen',
                                    }
                                }}
                                onClick={() => setOpenNewContract(true)}
                            >
                                Create contract
                            </Button>
                        )}
                    </Box>
                    {customer.subscription.contracts.map(contract => (
                        <Accordion key={contract.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id={contract.id.toString()}
                            >
                                Id: {contract.id}
                            </AccordionSummary>
                            <AccordionDetails>
                                Level: {contract.level}
                                <Typography variant='h6'>Weatherstations</Typography>
                                {contract.weatherstations.map(ws => (
                                    <Box key={ws.name}>
                                        {ws.name}
                                    </Box>
                                ))}
                            </AccordionDetails>
                        </Accordion>

                    ))}
                </Box>
            )}

            <CustomModal
                open={openNewContract}
                title="Add new customer"
                setOpen={setOpenNewContract}
                onSubmit={handleSubmit(() => createContract(customer.subscription.id))}
            >
                <TextField
                    sx={{ width: '50%', margin: '20px' }}
                    label="Level"
                    value={newContractForm.level}
                    {...register('level', { required: "name can't be empty" })}
                    onChange={handleChange}
                    helperText={errors.level?.message?.toString()}
                    error={errors.level?.message !== undefined}
                >
                </TextField>

                {usedWeatherstations.length > 0 && (
                    <Box display={'flex'} alignContent={'space-between'} flexDirection={'column'}>
                        <Typography variant="h5">
                            Weatherstations
                        </Typography>
                        {usedWeatherstations.map((ws) => (
                            <Box key={ws.name}>
                                {ws.name}
                                <Button onClick={() => {
                                    const newUsedWeatherstations = usedWeatherstations.filter((usedWs) => usedWs.name !== ws.name);
                                    setUsedWeatherstations(newUsedWeatherstations);
                                }}>x</Button>
                            </Box>
                        ))}
                    </Box>
                )}

                <Autocomplete
                    disablePortal
                    id="weatherstations"
                    options={weatherstations}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.geolocation.country.name + " " + option.name}
                    renderInput={(params) => <TextField {...params} label="Weatherstations" key={params.id} />}
                    onChange={(event, weatherstation) => {
                        if (weatherstation) {
                            setUsedWeatherstations([...usedWeatherstations, weatherstation]);
                        }
                    }}
                />

            </CustomModal >
        </Box >
    ) :
        <Typography>No Customer Found</Typography>
}