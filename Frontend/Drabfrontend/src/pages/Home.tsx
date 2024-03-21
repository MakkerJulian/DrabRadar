import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/Map.css';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandLess } from '@mui/icons-material';

let dark_mode = true;

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
    type locations = {
        name: string,
        longitude: number,
        latitude: number,
    }
    const [locations, setLocations] = useState<locations[]>([]);
    const [activeAccordion, setActiveAccordion] = useState<number>();

    useEffect(() => {
        axiosInstance.get('/weatherstation/details')
            .then((res) => {
                setLocations(res.data);
            })
            .catch((err) => { console.log(err) });
    }, []);

    const handleMarkerClick = (index: number) => {
        setActiveAccordion(index);
    };

    return (
        <Box
            position={'relative'}
        >
            <MapContainer center={[39.1, 40.3]} zoom={2.5} style={{ "height": "100vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => (
                    <Marker key={index} position={[location.latitude, location.longitude]} eventHandlers={{ click: () => handleMarkerClick(index) }}>
                        <Popup>
                            {location.name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <Box
                display={'flex'}
                position={'absolute'}
                right={0}
                top={0}
                width={'20%'}
                height={'100%'}
                bgcolor={'rgba(0,0,0,0.8)'}
                zIndex={1000}
                fontSize={'40px'}
                color={'white'}
            >
                <Box
                    overflow={'auto'}
                >
                    {locations.map((location, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                backgroundColor: "inherit",
                                color: "white",
                                fontSize: "25px"
                            }}
                            expanded={activeAccordion === index}
                        >
                            <AccordionSummary
                                aria-controls={`panel-${index}-content`}
                                id={`panel-${index}-header`}
                            >
                                Weatherstation Nr. {location.name}

                                <IconButton onClick={() => {
                                    if (activeAccordion === index) {
                                        setActiveAccordion(undefined)
                                    } else {
                                        setActiveAccordion(index)
                                    }
                                }
                                }>
                                    {activeAccordion === index ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
                                </IconButton>
                            </AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                right={'20%'}
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
