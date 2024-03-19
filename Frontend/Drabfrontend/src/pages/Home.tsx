import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/Map.css';
import { Button } from '@mui/material';

let dark_mode = true;

function changeTheme() {
    const elements = document.querySelectorAll('.leaflet-layer, .leaflet-control-zoom-in, .leaflet-control-zoom-out, .leaflet-control-attribution');
    if (dark_mode) {
        elements.forEach(element => {
            (element as HTMLElement).style.filter = 'invert(0%) hue-rotate(0deg) brightness(100%) contrast(100%) grayscale(0%)';
        });
        dark_mode = false;
        return;
    } else {
        elements.forEach(element => {
            (element as HTMLElement).style.filter = 'invert(120%) hue-rotate(200deg) brightness(100%) contrast(100%) grayscale(100%)';
        });
        dark_mode = true;
        return;
    }
}

export const Home = () => {
    type locations = {
        name: string,
        longitude: number,
        latitude: number,
    }
    const [locations, setLocations] = useState<locations[]>([]);

    useEffect(()=>{
        axiosInstance.get('/weatherstation')
            .then((res)=>{
                setLocations(res.data);
            })
            .catch((err)=>{console.log(err)});
    },[]);

    return (
        <div className="map-wrapper">
            <MapContainer center={[39.1, 40.3]} zoom={2.5} style={{"height": "968px"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => (
                    <Marker key={index} position={[location.latitude, location.longitude]}>
                        <Popup>
                            {location.name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <div className="extra-div">
                hi
            </div>
            <div className="button-div">
                <Button id={"ThemeButton"} onClick={changeTheme}>Theme</Button>
            </div>
        </div>
    );
    
}
