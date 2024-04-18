import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect } from "react";
import axiosInstance from '../axios';
import { Customer, Weatherstation } from '../types';
import { enqueueSnackbar } from 'notistack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CustomModal } from '../components/customModal';
import { useForm } from 'react-hook-form';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useNavigate } from "react-router-dom";


const emptyNewContractForm = {
    level: "0",
    subscriptionId: 0,
    weatherstations: []
}

type newContractForm = {
    level: string,
    subscriptionId: number,
    weatherstations: Weatherstation[]
}

export const CustomerDetails = () => {
    const [customer, setCustomer] = React.useState<Customer>();
    const [newContractForm, setNewContractForm] = React.useState<newContractForm>(emptyNewContractForm);
    const [openNewContract, setOpenNewContract] = React.useState<boolean>(false);
    const [weatherstations, setWeatherstations] = React.useState<Weatherstation[]>([]);
    const [usedWeatherstations, setUsedWeatherstations] = React.useState<Weatherstation[]>([]);

    const {
        register, formState: { errors }, handleSubmit,
    } = useForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewContractForm({ ...newContractForm, [e.target.name]: e.target.value });
    }

    const handleDisable = () => {
        return usedWeatherstations.length >= 1 && newContractForm.level !== "1" //Level 1 mag maar 1  
    }

    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (customer) {
            setCustomer({
                ...customer,
                [name]: value
            });
        }
    };

    const navigate = useNavigate();

    const createContract = (subscriptionId: number) => {
        const newContract = {
            ...newContractForm,
            subscriptionId: subscriptionId,
            weatherstations: usedWeatherstations.map(ws => ws.name)
        }
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

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
            .catch((error) => {
                console.error('Kopiëren mislukt: ', error);
            });
    };

    function handleSave(id: number, name: string, phone: string, email: string): void {
        const updateData = {
            id: id,
            name: name,
            phone: phone,
            email: email
        };

        axiosInstance.patch('customer', updateData)
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return customer ? (
        <Grid container spacing={3} overflow={'hidden'}>
            <Grid item xs={12}
                margin={"12px"}
            >
                <Button
                    sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        margin: 'auto',
                        position: 'absolute',
                        top: 15,
                        left: 15,
                        ":hover": {
                            backgroundColor: 'darkgreen',
                        }
                    }}
                    onClick={() => {
                        navigate('/sales')
                    }}>
                    Back
                </Button>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography variant="h1">Customer: {customer.name}</Typography>
                </Box>
            </Grid>
            <Grid item xs={6}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                border={"solid black 2px"}
                borderRadius={"5px"}
            >
                <Typography variant="h4">
                    <Box justifyContent={'center'} display={'flex'} marginBottom={2}>Account details</Box>
                    <TextField
                        sx={{ margin: 1 }}
                        name="name"
                        label="Name:"
                        value={customer.name}
                        onChange={handleUpdateChange}
                        variant="outlined"
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        name="phone"
                        label="Phone number:"
                        value={customer.phone}
                        onChange={handleUpdateChange}
                        variant="outlined"
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        name="email"
                        label="E-mail:"
                        value={customer.email}
                        onChange={handleUpdateChange}
                        variant="outlined"
                    />
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => handleSave(customer.id, customer.name, customer.phone, customer.email)}
                    sx={{ marginBottom: 2, marginTop: 1, backgroundColor: "green", ":hover": { backgroundColor: "darkgreen" } }}
                >
                    Update customer
                </Button>
            </Grid>
            <Grid item xs={6}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                border={"solid black 2px"}
                borderRadius={"5px"}
            >
                <Box display={'flex'} flexDirection={'column'} marginLeft={'1vw'}>
                    <Typography variant="h4" margin={'auto'} marginBottom={'20px'} width={'25vw'} textAlign={'center'}>
                        Subscription: {customer.subscription ? customer.subscription.id : "\n No subscription"}
                    </Typography>

                    <Typography variant="h4">
                        <TextField
                            value={customer.subscription ? customer.subscription.token : ""}
                            label="Token"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ width: "90%" }}
                        >
                        </TextField>
                        <IconButton onClick={() => handleCopy(customer.subscription ? customer.subscription.token : "")}>
                            <FileCopyIcon />
                        </IconButton>
                    </Typography>
                    <Button
                        sx={{
                            backgroundColor: 'green',
                            color: 'white',
                            marginTop: 2,
                            marginBottom: 2,
                            width: "98%",
                            ":hover": {
                                backgroundColor: 'darkgreen',
                            }
                        }}
                        onClick={!customer.subscription ? () => addSubscription(customer.id) : () => refreshSubscription(customer.id)}
                    >
                        {!customer.subscription ? 'Add Subscription' : 'Refresh Token'}
                    </Button>

                </Box>
            </Grid>
            <Grid item xs={12}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                border={"solid black 2px"}
                borderRadius={"5px"}
                overflow={"auto"}
            >
                {customer.subscription && (
                    <Box width={'90%'} margin={'auto'} height={"58vh"}>
                        <Box display={'flex'}>
                            <Typography variant="h4" margin={'auto'} marginBottom={'20px'}>
                                Contracts
                            </Typography>
                        </Box>
                        {customer.subscription.contracts.map(contract => (
                            <Accordion key={contract.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id={contract.id.toString()}
                                >
                                    <Typography variant='h4'>
                                        contract id: {contract.id}
                                    </Typography>
                                    <Button onClick={() => {
                                        axiosInstance.delete(`/contract/${contract.id}`).then(() => {
                                            axiosInstance.get<Customer>(`/customer/${customer.id}`).then((response) => {
                                                setCustomer(response.data);
                                            });
                                        });
                                    }}>x</Button>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant='h5'>
                                        {contract.level === 0 ? "Contract niveau 1, daily updates for 1 station" :
                                            contract.level === 1 ? "Contract niveau 2, daily updates for multiple stations" :
                                                contract.level === 2 ? "Contract level 3, live updates for 1 station" :
                                                    "Onbekend niveau"}
                                    </Typography>
                                    <Typography variant='h5'>Weatherstations</Typography>
                                    {contract.weatherstations.map(ws => (
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <Box key={ws.name}>
                                                    <Typography variant='h6'>
                                                        {"station number: " + ws.name + " "}
                                                        {"Country: " + ws.geolocation.country.name + " "}
                                                        {"height: " + ws.elevation + "M "}
                                                        {"latitude: " + ws.latitude + " "}
                                                        {"Longitude: " + ws.longitude + " "}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={1} >
                                                <Button onClick={() => {
                                                    axiosInstance.patch(`/contract/${contract.id}/weatherstation/${ws.name}`).then(() => {
                                                        axiosInstance.get<Customer>(`/customer/${customer.id}`).then((response) => {
                                                            setCustomer(response.data);
                                                        });
                                                    });
                                                }}
                                                    sx={{ fontSize: 15, float: "right" }}>x
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                        <br />
                        <br />
                        <br />
                        <Box display={'flex'} justifyContent={'center'} marginTop={2} marginBottom={2}>
                            {customer.subscription && (
                                <Button
                                    sx={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                        width: "80%",
                                        position: "absolute",
                                        justifyContent: "center",
                                        bottom: 10,
                                        ":hover": {
                                            backgroundColor: 'darkgreen',
                                        }
                                    }}
                                    onClick={() => { setOpenNewContract(true); setUsedWeatherstations([]); }}
                                >
                                    Create contract
                                </Button>
                            )}
                        </Box>
                    </Box>
                )}
                <CustomModal
                    open={openNewContract}
                    title="Add new Contract"
                    setOpen={setOpenNewContract}
                    onSubmit={handleSubmit(() => createContract(customer.subscription.id))}
                >
                    <TextField
                        sx={{ width: '80%', margin: '20px' }}
                        label="Level"
                        select
                        value={newContractForm.level}
                        {...register('level', { required: "name can't be empty" })}
                        onChange={handleChange}
                        helperText={errors.level?.message?.toString()}
                        error={errors.level?.message !== undefined}
                    >
                        <MenuItem value="0">Level 1</MenuItem>
                        <MenuItem value="1">Level 2</MenuItem>
                        <MenuItem value="2">Level 3</MenuItem>
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
                                    }}>
                                        x
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    )}
                    <Autocomplete
                        disablePortal
                        disabled={handleDisable()}
                        id="weatherstations"
                        options={weatherstations}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.geolocation.country.name + " " + option.name}
                        renderInput={(params) => <TextField {...params} label="Weatherstations" key={params.id} />}
                        onChange={(event, weatherstation) => {
                            if (weatherstation) {
                                setNewContractForm({ ...newContractForm, weatherstations: [...newContractForm.weatherstations, weatherstation] });
                                setUsedWeatherstations([...usedWeatherstations, weatherstation]);
                            }
                        }}
                    />
                </CustomModal >
            </Grid>
        </Grid >
    ) :
        <Typography>No Customer Found</Typography>
}