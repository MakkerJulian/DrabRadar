import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormControlLabel,
    Switch,
    Typography,
    styled, Drawer, DialogContent, IconButton,
    Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandLess } from '@mui/icons-material';
import { WeatherstationDetail } from '../types';

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'; //freezing
import WaterDropIcon from '@mui/icons-material/WaterDrop';//rain
import AcUnitIcon from '@mui/icons-material/AcUnit'; //snow
import SevereColdIcon from '@mui/icons-material/SevereCold'; //hail
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'; //thunder
import TornadoIcon from '@mui/icons-material/Tornado'; //Tornado
import { IWALogo } from '../assets';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { LogoutButton } from "../components/logoutButton.tsx";

let dark_mode = false;

function changeTheme() {
    const elements = document.querySelectorAll('.leaflet-layer, .leaflet-control-zoom-in, .leaflet-control-zoom-out, .leaflet-control-attribution');
    if (dark_mode) {
        elements.forEach(element => {
            (element as HTMLElement).style.filter = 'invert(0%) hue-rotate(0deg) brightness(100%) contrast(100%) grayscale(0%)';
        });
        document.body.style.backgroundColor = 'white';
        dark_mode = false;
    } else {
        elements.forEach(element => {
            (element as HTMLElement).style.filter = 'invert(120%) hue-rotate(200deg) brightness(100%) contrast(100%) grayscale(100%)';
        });
        document.body.style.backgroundColor = 'black';
        dark_mode = true;
    }
}
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export const Home = () => {

    const [storingOpen, setStoringOpen] = React.useState(false);
    const [weatherstations, setweatherstations] = useState<WeatherstationDetail[]>([]);
    const [allWeatherstations, setAllWeatherstations] = useState<WeatherstationDetail[]>([]);
    const [activeAccordion, setActiveAccordion] = useState<number>();
    const mapRef = useRef<any>(null);

    useEffect(() => {
        axiosInstance.get<WeatherstationDetail[]>('/weatherstation/details')
            .then((res) => {
                setweatherstations(res.data)
            })
            .catch((err) => { console.log(err) });

        axiosInstance.get<WeatherstationDetail[]>('/weatherstation/storingen')
            .then((res) => {
                setAllWeatherstations(res.data)
            });
    }, []);

    useEffect(() => {
        if (activeAccordion !== null) {
            const accordionElement = document.getElementById(`panel-${activeAccordion}-header`);
            if (accordionElement) {
                accordionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeAccordion]);

    const handleMarkerClick = (index: number): void => {
        if (mapRef.current !== null) {
            mapRef.current.flyTo([weatherstations[index].latitude, weatherstations[index].longitude], 12, {
                "animate": true,
                "pan": {
                    "duration": 10
                }
            });
        }
        setActiveAccordion(index);
    };

    const malfunctionCount = allWeatherstations.reduce((acc, weatherstation) => acc + Number(weatherstation.storings.length), 0);

    const handleAccordionClick = (index: number): void => {
        if (mapRef.current !== null) {
            mapRef.current.flyTo([weatherstations[index].latitude, weatherstations[index].longitude], 12, {
                "animate": true,
                "pan": {
                    "duration": 10
                }
            });
        }
    }

    const navigate = useNavigate();

    const HandleDragAndZoom = () => {
        const map = useMapEvents({
            dragend: async () => {
                const bounds = map.getBounds();
                const newWeatherstations = await axiosInstance.post<WeatherstationDetail[]>('/weatherstation/details', bounds)
                setweatherstations(newWeatherstations.data)
            },
            zoomend: async () => {
                const bounds = map.getBounds();
                const newWeatherstations = await axiosInstance.post<WeatherstationDetail[]>('/weatherstation/details', bounds)
                setweatherstations(newWeatherstations.data)
            }
        });
        return null;
    }

    return (
        <Box
            position={'relative'}
        >
            <Box left={'10vw'} position={'absolute'} display={'flex'}>
                <LogoutButton />
            </Box>
            <MapContainer center={[39.1, 40.3]} zoom={2.5} style={{ "height": "100vh" }} ref={mapRef} preferCanvas={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {weatherstations.map((weatherstation, index) => (
                    <Marker key={index} position={[weatherstation.latitude, weatherstation.longitude]} eventHandlers={{ click: () => handleMarkerClick(index) }}>
                    </Marker>
                ))}
                <HandleDragAndZoom />
            </MapContainer>
            <Box
                position={'absolute'}
                top={0}
                left={50}
                zIndex={1000}
            >
                <img src={IWALogo} alt='logo' style={{
                    position: "absolute",
                    width: "7vw",
                    height: "13vh",
                    zIndex: "1000"
                }}>
                </img>
            </Box>
            <Box
                display={'flex'}
                position={'absolute'}
                right={0}
                top={0}
                width={'25%'}
                height={'100%'}
                bgcolor={'rgba(0,0,0,0.8)'}
                zIndex={1000}
                fontSize={'40px'}
                color={'white'}
            >
                <Box
                    overflow={'auto'}
                    width={'100%'}
                >
                    {weatherstations.map((weatherstation, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                backgroundColor: "inherit",
                                color: "white",
                                fontSize: "25px",
                                width: "93%",
                            }}
                            expanded={activeAccordion === index}
                            onClick={() => handleAccordionClick(index)}
                        >
                            <AccordionSummary
                                aria-controls={`panel-${index}-content`}
                                id={`panel-${index}-header`}
                            >
                                <Button onClick={() => {
                                    if (activeAccordion === index) {
                                        setActiveAccordion(undefined)
                                    } else {
                                        setActiveAccordion(index)
                                    }
                                }}
                                    sx={{ color: "white", fontSize: "22px", fontWeight: "bold" }}
                                >
                                    Weatherstation Nr. {weatherstation.name}
                                    {activeAccordion === index ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
                                </Button>
                            </AccordionSummary>
                            <AccordionDetails
                            >
                                <Box>
                                    country: {weatherstation.geolocation.country.name}
                                </Box>
                                {weatherstation.weatherdatas && (
                                    <>
                                        <Box>
                                            temperature: {weatherstation.weatherdatas.temp}
                                        </Box>
                                        <Box>
                                            wind: {weatherstation.weatherdatas.windspeed} KM/H
                                        </Box>
                                        <Box>
                                            Wind direction: {weatherstation.weatherdatas.wind_direction}°
                                        </Box>
                                        <Box>
                                            {weatherstation.weatherdatas.freezing ? <DeviceThermostatIcon /> : null}
                                            {weatherstation.weatherdatas.rain ? <WaterDropIcon /> : null}
                                            {weatherstation.weatherdatas.snow ? <AcUnitIcon /> : null}
                                            {weatherstation.weatherdatas.hail ? <SevereColdIcon /> : null}
                                            {weatherstation.weatherdatas.thunder ? <ThunderstormIcon /> : null}
                                            {weatherstation.weatherdatas.tornado ? <TornadoIcon /> : null}
                                        </Box>
                                        <Box display={'flex'} flexDirection={'row'}>
                                            <Typography variant='h6'>Inspect:</Typography>
                                            <IconButton>
                                                <RemoveRedEyeIcon sx={{ color: "white" }} onClick={() => navigate(`/weatherstation/${weatherstation.name}`)} />
                                            </IconButton>
                                        </Box>
                                    </>
                                )}
                                {!weatherstation.weatherdatas && (
                                    <Typography>
                                        No data available
                                    </Typography>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>
            <Box
                display={"flex"}
                position={"absolute"}
                right={'0%'}
                bottom={'0%'}
                bgcolor={'black'}
                zIndex={1001}
                height={'7%'}
                width={'25%'}
                color={'white'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Button
                    href='/weatherstations'
                    sx={{
                        color: "white",
                        fontSize: "35px",
                        fontWeight: "bold"
                    }}
                >
                    All weatherstations
                </Button>
            </Box>
            <Box
                display={'flex'}
                position={'absolute'}
                right={'25%'}
                top={'0%'}
                height={'5%'}
                bgcolor={'inherit'}
                zIndex={1000}
                fontSize={'40px'}
                color={'white'}
            >
                <Button
                    onClick={changeTheme}
                    sx={{ color: 'white' }}
                >
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{ m: 1 }} />}
                        label=""
                    />
                </Button>
            </Box>
            <Box
                display={'flex'}
                position={'absolute'}
                right={'26%'}
                bottom={'1vh'}
                zIndex={1000}
            >
                <Button sx={{ zIndex: '1001', width: '125px', height: '70px', display: 'block' }} onClick={() => setStoringOpen(!storingOpen)}>

                </Button>

                <Typography position={'absolute'} variant={'h3'} color={'red'} bottom={'0vh'} right={'4.5vw'}>
                    {malfunctionCount}
                </Typography>
                <Drawer anchor={'bottom'} open={storingOpen} ModalProps={{ onBackdropClick: () => setStoringOpen(false) }} >
                    <>
                        <DialogContent sx={{ maxHeight: "30vh" }}>
                            {malfunctionCount > 0 ? allWeatherstations.map((weatherstation) => {
                                return weatherstation.storings.map((storing) => {
                                    return (
                                        <Grid container spacing={0}>
                                            <Grid item xs={11}>
                                                <Box display="flex">
                                                    <WarningAmberIcon color="error" sx={{ fontSize: "3vh" }} />
                                                    <Typography variant={'h4'}>Weatherstation: {weatherstation.name}</Typography>
                                                </Box>
                                                <Typography variant={'h4'}>Reason: {storing.reason}</Typography>
                                                <Typography variant={'h5'}>Time: {storing.timestamp}</Typography>\
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton onClick={() => navigate(`/weatherstation/${weatherstation.name}`)}>
                                                    <RemoveRedEyeIcon sx={{ color: 'blue', fontSize: '3vh', mt: 4 }} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    );
                                })
                            }) :
                                (
                                    <Box>
                                        <Typography variant={'h4'}>No malfunctions</Typography>
                                    </Box>
                                )}
                        </DialogContent>
                    </>
                </Drawer>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '0vh',
                        right: '0vh',
                        width: "3.5vw",
                        height: "7vh",
                    }}
                >
                    <WarningAmberIcon sx={{ color: 'red', fontSize: '3.5vw' }} />
                </Box>

            </Box>
        </Box>
    );

}

