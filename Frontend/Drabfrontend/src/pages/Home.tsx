import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/Map.css';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControlLabel, Switch, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandLess } from '@mui/icons-material';
import { WeatherstationDetail } from '../types';

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'; //freezing
import WaterDropIcon from '@mui/icons-material/WaterDrop';//rain
import AcUnitIcon from '@mui/icons-material/AcUnit'; //snow
import SevereColdIcon from '@mui/icons-material/SevereCold'; //hail
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'; //thunder
import TornadoIcon from '@mui/icons-material/Tornado'; //Tornado

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
    const [weatherstations, setweatherstations] = useState<WeatherstationDetail[]>([]);
    const [activeAccordion, setActiveAccordion] = useState<number>();
    const mapRef = useRef<any>(null);


    useEffect(() => {
        axiosInstance.get<WeatherstationDetail[]>('/weatherstation/details')
            .then((res) => {
                setweatherstations(res.data);
            })
            .catch((err) => { console.log(err) });
    }, []);

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
    return (
        <Box
            position={'relative'}
        >
            <MapContainer center={[39.1, 40.3]} zoom={2.5} style={{ "height": "100vh" }} ref={mapRef}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {weatherstations.map((weatherstation, index) => (
                    <Marker key={index} position={[weatherstation.latitude, weatherstation.longitude]} eventHandlers={{ click: () => handleMarkerClick(index) }}>
                    </Marker>
                ))}
            </MapContainer>
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
                                width: "100%",
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
                                sx={{
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gridTemplateRows: "repeat(2, 1fr)"
                                }}
                            >
                                <Box>
                                    country: {weatherstation.geolocation.country.name}
                                </Box>
                                <Box>
                                    temperature: {weatherstation.weatherdatas ? weatherstation.weatherdatas.temp : "NO DATA"}
                                </Box>
                                <Box>
                                    wind: {weatherstation.weatherdatas ? weatherstation.weatherdatas.windspeed : "NO DATA"} KM/H
                                    in direction: {weatherstation.weatherdatas ? weatherstation.weatherdatas.wind_direction : "NO DATA"}°
                                </Box>
                                <Box>
                                    in direction: {weatherstation.weatherdatas ? weatherstation.weatherdatas.wind_direction : "NO DATA"}°
                                </Box>
                                <Box>
                                    {weatherstation.weatherdatas.freezing ? <DeviceThermostatIcon /> : null}
                                    {weatherstation.weatherdatas.rain ? <WaterDropIcon /> : null}
                                    {weatherstation.weatherdatas.snow ? <AcUnitIcon /> : null}
                                    {weatherstation.weatherdatas.hail ? <SevereColdIcon /> : null}
                                    {weatherstation.weatherdatas.thunder ? <ThunderstormIcon /> : null}
                                    {weatherstation.weatherdatas.tornado ? <TornadoIcon /> : null}
                                </Box>
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
        </Box>
    );

}

