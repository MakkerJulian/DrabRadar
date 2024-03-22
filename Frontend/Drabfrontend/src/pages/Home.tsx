import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/Map.css';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, IconButton, duration } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandLess } from '@mui/icons-material';
import { Weatherstation } from '../types';

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

export const Home = () => {
    const [weatherstations, setweatherstations] = useState<Weatherstation[]>([]);
    const [activeAccordion, setActiveAccordion] = useState<number>();
    const mapRef = useRef<any>(null);


    useEffect(() => {
        axiosInstance.get('/weatherstation/details')
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
                                <Box
                                    sx={{ gridColumn: "1", gridRow: "1" }}
                                >
                                    country: {weatherstation.geolocation.country.name}
                                </Box>
                                <Box
                                    sx={{ gridColumn: "2", gridRow: "1" }}
                                >
                                    temperature
                                    {/* temperature: {weatherstation.weatherdata.temp} */}
                                </Box>
                                <Box
                                    sx={{ gridColumn: "1", gridRow: "2" }}
                                >
                                    windspeed and direction
                                    {/* wind: {weatherstation.weatherdata.windspeed} KM/H 
                                    in direction: {weatherstation.weatherdata.wind_direction}° */}
                                </Box>
                                <Box
                                    sx={{ gridColumn: "2", gridRow: "2" }}
                                >
                                    //todo icons
                                </Box>
                            </AccordionDetails>
                            <AccordionActions>
                                <Button>Cancel</Button>
                                <Button>Agree</Button>
                            </AccordionActions>
                        </Accordion>
                    ))}
                </Box>
            </Box>
            <Box
                display={'flex'}
                position={'absolute'}
                right={'25%'}
                bottom={'0%'}
                height={'5%'}
                bgcolor={'rgba(0,0,0,0.8)'}
                zIndex={1000}
                fontSize={'40px'}
                color={'white'}
            >
                <Button id={"ThemeButton"} onClick={changeTheme} sx={{ color: 'white' }}>Theme</Button>
            </Box>
        </Box>
    );

}

