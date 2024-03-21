import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, AutocompleteRenderInputParams, Box, Button, TextField, Typography } from '@mui/material';
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

    const {
        register, formState: { errors }, handleSubmit,
    } = useForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewContractForm({ ...newContractForm, [e.target.name]: e.target.value });
    }


    const createContract = (subscriptionId: number) => {
        const newContract = {
            ...newContractForm,
            subscriptionId: subscriptionId
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

    return customer && (
        <Box>
            <Typography variant="h1">
                Customer {customer.name}
            </Typography>

            {customer.email} <br></br>
            {customer.phone} <br></br>


            <Button
                sx={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                }}
                onClick={!customer.subscription ? () => addSubscription(customer.id) : () => refreshSubscription(customer.id)}
            >
                {!customer.subscription ? 'Add Subscription' : 'Refresh Token'}
            </Button>

            {customer.subscription && (
                <Button
                    sx={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                    }}
                    onClick={() => setOpenNewContract(true)}
                >
                    Create contract
                </Button>
            )}

            {customer.subscription && (
                <Box>
                    <Typography variant="h2">
                        Subscription {customer.subscription.id}
                    </Typography>
                    {customer.subscription.token} <br></br>
                </Box>

            )}
            {customer.subscription && customer.subscription.contracts.length > 0 && (
                <Box width={'50%'} margin={'auto'}>
                    <Typography variant="h3" margin={'auto'}>
                        Contracts
                    </Typography>
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
                                {contract.weatherstations.map(ws => (
                                    <Box>
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

                <Autocomplete
                    disablePortal
                    id="weatherstations"
                    options={weatherstations}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Weatherstations" />}
                    getOptionLabel={(option) => option.geolocation.country.name + " " + option.name}
                />

            </CustomModal>
        </Box>
    )
}